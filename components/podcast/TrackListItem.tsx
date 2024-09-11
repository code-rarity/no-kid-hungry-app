import { TouchableHighlight, Image, StyleSheet } from 'react-native';
import { Track, useActiveTrack, useIsPlaying } from 'react-native-track-player';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import LoaderKit from 'react-native-loader-kit';
import { Colors } from '@/constants/Colors';

export type TrackListItemProps = {
  track: Track
  onTrackSelect: (track: Track) => void
}

export const TrackListItem = ({track, onTrackSelect: handleTrackSelect}: TrackListItemProps) => {
  const {playing} = useIsPlaying();
  const isActiveTrack = useActiveTrack()?.url === track.url;

  return (
     <TouchableHighlight onPress={() => handleTrackSelect(track)} style={{marginVertical:10}}>
      <ThemedView style={styles.trackItemContainer}>
        <ThemedView style={{
            ...styles.trackImageContainer
          }}>
          <Image source={{ 
            uri: track.image 
          }} style={{
            ...styles.trackImage,
            opacity: isActiveTrack ? 0.5 : 1
          }} />

          {isActiveTrack && ( playing ? (
            <LoaderKit style={styles.trackPlayingIconIndicator} name="AudioEqualizer" color="#fff" />
            ) : (
            <MaterialCommunityIcons style={styles.trackPausedIndicator} name="play" size={32} color="#f27622" /> 
          ))}
        </ThemedView>
        <ThemedView style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor:'#fff'
          }}>
          <ThemedView style={{ flex:1, backgroundColor:'#fff', width:'100%', paddingLeft:15}}>
            <ThemedText 
              numberOfLines={1} 
              style={{
                ...styles.trackTitleText,
                color: isActiveTrack ? "#f27622": "#000"
              }}>
              {track.title}
            </ThemedText>
            <ThemedText 
              numberOfLines={1} 
              style={{
                ...styles.trackDateText,
                color: isActiveTrack ? "#f27622": "#000"
              }}>
              {track.date}
            </ThemedText>
          </ThemedView>
          <MaterialCommunityIcons name="dots-horizontal" size={25} color={isActiveTrack ? '#f27622' : '#000'} />
        </ThemedView>
      </ThemedView>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  trackItemContainer: {
    flexDirection: 'row',
    columngap: 14,
    alignItems: 'center',
    backgroundColor:'#fff',
    overflow:'hidden',
  },
  trackPlayingIconIndicator: {
    position:'absolute',
    fontWeight:'bold',
    top:15,
    left:18,
    width:24,
    height:24,
  },
  trackPausedIndicator: {
    position:'absolute',
    top:14,
    left:14,
  },
  trackImageContainer: {
    borderRadius:20,
    overflow:'hidden',
  },
  trackImage: {
    width:60,
    height:60
  },
  trackDateText: {
    fontSize: 12,
    fontWeight:'bold',
    maxWidth: '90%',
    backgroundColor:'#fff'
  },
  trackTitleText: {
    fontSize: 16,
    fontWeight:'bold',
    maxWidth: '90%',
    backgroundColor:'#fff'
  }
})
