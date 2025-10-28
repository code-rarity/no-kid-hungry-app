import React from 'react';
import { Image, TouchableOpacity, StyleSheet, Dimensions, ViewProps } from 'react-native';
import TrackPlayer, { useActiveTrack } from 'react-native-track-player';
import { useLastActiveTrack } from '@/hooks/useLastActiveTrack';
import { PlayPauseButton, SkipToNextButton } from '@/components/podcast/PlayerControls';
import { useRouter } from 'expo-router';
import { MovingText } from '@/components/podcast/MovingText';
import { ThemedView } from '@/components/ThemedView';

// 1. Import Gesture Handler and Reanimated
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';

const { width: screenWidth } = Dimensions.get('window');
// Define how far the user needs to swipe to dismiss
const DISMISS_THRESHOLD = screenWidth / 3;

export const FloatingPlayer = ({style}: ViewProps) => {
  const router = useRouter();
  const activeTrack = useActiveTrack();
  const lastActiveTrack = useLastActiveTrack();
  const displayedTrack = activeTrack ?? lastActiveTrack;

  // 2. Create shared values for animation
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  // This function will be called on the JS thread after the dismiss animation
  const resetPlayerOnJS = () => {
    'worklet';
    // Use runOnJS to call a function that is not a worklet
    runOnJS(TrackPlayer.reset)();
  };

  // 3. Define the pan gesture
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      // Allow swiping left or right
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (Math.abs(event.translationX) > DISMISS_THRESHOLD) {
        // If swiped far enough, animate off-screen and fade out
        translateX.value = withTiming(Math.sign(event.translationX) * screenWidth, { duration: 200 });
        opacity.value = withTiming(0, { duration: 200 }, (finished) => {
          if (finished) {
            // When animation is complete, reset the player to hide the component
            resetPlayerOnJS();
          }
        });
      } else {
        // If not swiped far enough, animate back to the center
        translateX.value = withTiming(0, { duration: 200 });
      }
    });

  // 4. Create the animated style object
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  const handlePress = () => {
    router.navigate('(drawer)/(tabs)/podcast/player');
  }

  if(!displayedTrack) {
    return null;
  }

  return (
    // 5. Wrap the component in the GestureDetector and an Animated.View
    <GestureDetector gesture={panGesture}>
        <Animated.View style={[style, animatedStyle]}>
            <TouchableOpacity onPress={handlePress} activeOpacity={0.9} style={styles.container}>
                <>
                    <Image 
                      // Corrected to use .artwork which is the standard track-player property
                      source={{ uri: displayedTrack.artwork as string }} 
                      style={styles.trackArtworkImage}
                    />
                    <ThemedView style={styles.trackTitleContainer}>
                      <MovingText style={styles.trackTitle} text={displayedTrack.title ?? ''} animationThreshold={50} />
                    </ThemedView>
                    <ThemedView style={styles.trackControlsContainer}>
                      <PlayPauseButton iconSize={42} style={{backgroundColor:'transparent'}} />
                      <SkipToNextButton iconSize={36} />
                    </ThemedView>
                </>
            </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems:'center',
    padding:8,
    // borderRadius is now handled by the style prop from the layout
    paddingVertical: 5, 
    backgroundColor: 'transparent',
  },
  trackArtworkImage: {
    width:50,
    height:50,
    borderRadius:8,
  },
  trackTitleContainer: {
    flex:1,
    overflow:'hidden',
    marginLeft:10,
    backgroundColor: 'transparent',
  },
  trackTitle: {
    backgroundColor:'transparent',
    fontSize:12,
    fontWeight:'bold',
    paddingLeft:10,
    color:'#fff',
  },
  trackControlsContainer: {
    flexDirection:'row',
    alignItems:'center',
    columnGap:2,
    marginRight:6,
    paddingLeft:16,
    backgroundColor: 'transparent',
  }
})
