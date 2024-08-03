import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useActiveTrack } from 'react-native-track-player';
import { useLastActiveTrack } from '@/hooks/useLastActiveTrack';
import { PlayPauseButton, SkipToNextButton } from '@/components/podcast/PlayerControls';
import { MovingText } from '@/components/podcast/MovingText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export const FloatingPlayer = ({style}: ViewProps) => {
  const activeTrack = useActiveTrack();
  const lastActiveTrack = useLastActiveTrack();

  const displayedTrack = activeTrack ?? lastActiveTrack;

  if(!displayedTrack) {
    return null;
  }

  return (
    <TouchableOpacity activeOpacity={0.9} style={[styles.container, style]}>
      <>
        <Image 
          source={{ uri: displayedTrack.image }} 
          style={style.trackArtworkImage}
        />
      </>
      <ThemedView style={styles.trackTitleContainer}>
        <MovingText style={styles.trackTitle} text={displayedTrack.title} animationThreshold={25} />
      </ThemedView>
      <ThemedView style={styles.trackControlsContainer}>
        <PlayPauseButton iconSize={50} style={{backgroundColor:"#252525"}} />
        <SkipToNextButton iconSize={36} />
      </ThemedView>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems:'center',
    padding:10,
    borderRadius:15,
    paddingVertical: 0,
  },
  trackArtworkImage: {
    width:40,
    height:40,
    borderRadius:8,
  },
  trackTitleContainer: {
    flex:1,
    overflow:'hidden',
    marginLeft:10,
  },
  trackTitle: {
    fontSize:10,
    fontWeight:'bold',
    paddingLeft:10,
    color:'#fff',
    backgroundColor:'#252525',
  },
  trackControlsContainer: {
    flexDirection:'row',
    alignItems:'center',
    columnGap:5,
    marginRight:16,
    paddingLeft:16,
    backgroundColor:'#252525',
  }
})