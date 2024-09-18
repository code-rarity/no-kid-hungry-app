import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useActiveTrack } from 'react-native-track-player';
import { useLastActiveTrack } from '@/hooks/useLastActiveTrack';
import { PlayPauseButton, SkipToNextButton } from '@/components/podcast/PlayerControls';
import { useRouter } from 'expo-router';
import { MovingText } from '@/components/podcast/MovingText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export const FloatingPlayer = ({style}: ViewProps) => {
  const router = useRouter();
  const activeTrack = useActiveTrack();
  const lastActiveTrack = useLastActiveTrack();
  const displayedTrack = activeTrack ?? lastActiveTrack;

  const handlePress = () => {
    router.navigate('(drawer)/(tabs)/podcast/player');
  }

  if(!displayedTrack) {
    return null;
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9} style={[styles.container, style]}>
      <>
        <Image 
          source={{ uri: displayedTrack.image }} 
          style={styles.trackArtworkImage}
        />
        <ThemedView style={styles.trackTitleContainer}>
          <MovingText style={styles.trackTitle} text={displayedTrack.title} animationThreshold={50} />
        </ThemedView>
        <ThemedView style={styles.trackControlsContainer}>
          <PlayPauseButton iconSize={42} style={{backgroundColor:'transparent'}} />
          <SkipToNextButton iconSize={36} />
        </ThemedView>
      </>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems:'center',
    padding:8,
    borderRadius:15,
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