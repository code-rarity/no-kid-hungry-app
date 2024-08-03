import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useActiveTrack } from 'react-native-track-player';
import { PlayPauseButton, SkipToNextButton } from '@/components/podcast/PlayerControls';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export const FloatingPlayer = ({style}: ViewProps) => {
  const activeTrack = useActiveTrack();
  //const lastActiveTrack = useLastActiveTrack();

  const displayedTrack: Track = activeTrack ?? {
    title: 'This is an episode'
  };

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
        <ThemedText style={styles.trackTitle}>{displayedTrack.title}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.trackControlsContainer}>
        <PlayPauseButton iconSize={36} style={{backgroundColor:"#252525"}} />
        <SkipToNextButton iconSize={30} />
      </ThemedView>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems:'center',
    padding:8,
    borderRadius:12,
    paddingVertical: 10,
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
  },
  trackTitle: {
    fontSize:16,
    fontWeight:'bold',
    paddingLeft:10,
    color:'#fff',
    backgroundColor:'#252525',
  },
  trackControlsContainer: {
    flexDirection:'row',
    alignItems:'center',
    columnGap:4,
    marginRight:16,
    paddingLeft:16,
    backgroundColor:'#252525',
  }
})