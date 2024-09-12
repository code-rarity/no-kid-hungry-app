import { ActivityIndicator, StyleSheet, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { screenPadding } from '@/constants/Layout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useActiveTrack } from 'react-native-track-player';
import { MovingText } from '@/components/podcast/MovingText';
import { PlayerProgressBar } from '@/components/podcast/PlayerProgressBar';
import { PlayerVolumeBar } from '@/components/podcast/PlayerVolumeBar';
import { PlayerControls } from '@/components/podcast/PlayerControls';
import { PlayerRepeatToggle } from '@/components/podcast/PlayerRepeatToggle';
import { DismissSymbol } from '@/components/DismissSymbol';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const PlayerScreen = () => {
  const {top, bottom} = useSafeAreaInsets();
  const activeTrack = useActiveTrack();
  const isFavorite = false;

  const toggleFavorite = () => {
  }

  if(!activeTrack) {
    return (
      <ThemedView style={{justifyContent:'center'}}>
        <ActivityIndicator color={"#fff"} />
      </ThemedView>
    )
  }

  return (
    <ThemedView style={styles.overlayContainer}>
      <DismissSymbol viewHeight={null} />
      <ThemedView style={{flex:1, marginTop:top+70, marginBottom:bottom, backgroundColor:'transparent'}}>
        <ThemedView style={styles.artworkImageContainer}>
          <Image source={{ uri: activeTrack.image }} resizeMode="cover" style={styles.artworkImage} />
        </ThemedView>
        <ThemedView style={{flex:1, backgroundColor:'transparent'}}>
          <ThemedView style={{marginTop:'auto', backgroundColor:'transparent'}}>
            <ThemedView style={{height:60, backgroundColor:'transparent'}}>
              <ThemedView style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', backgroundColor:'transparent'}}>

                <ThemedView style={styles.trackTitleContainer}>
                  <MovingText text={activeTrack.title ?? ''} animationThreshold={30} style={styles.trackTitleText} />
                </ThemedView>

                <MaterialCommunityIcons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color={isFavorite ? "green" : "#fff"} style={{marginHorizontal:14}} onPress={toggleFavorite} />
              </ThemedView>
            </ThemedView>

            <PlayerProgressBar style={{marginTop: 32, backgroundColor:'transparent'}} />

            <PlayerControls style={{marginTop: 40}} />
          </ThemedView>

          <PlayerVolumeBar style={{marginTop: 'auto', marginBottom: 30, backgroundColor:'transparent'}} />

          <ThemedView style={styles.centeredRow}>
            <PlayerRepeatToggle size={30} style={{marginBottom:6}} />
          </ThemedView>

        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    flex:1,
    paddingHorizontal: screenPadding.horizontal,
    backgroundColor:'rgba(242,118,34,1)',
  },
  artworkImageContainer: {
    shadowOffset: {
      width:0,
      height:8,
    },
    shadowOpacity:0.44,
    shadowRadius: 11.0,
    flexDirection: 'row',
    justifyContent: 'center',
    height:'45%',
    backgroundColor:'transparent',
  },
  artworkImage: {
    width:'100%',
    height:'100%',
    resizeMode:'cover',
    borderRadius: 12,
  },
  trackTitleContainer: {
    flex:1,
    overflow: 'hidden',
    backgroundColor:'transparent',    
  },
  trackTitleText: {
    fontSize:22,
    fontWeight:'700',
    color:"#fff",
    backgroundColor:'transparent',    
  },
  centeredRow: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'transparent',
  }
});

export default PlayerScreen;
