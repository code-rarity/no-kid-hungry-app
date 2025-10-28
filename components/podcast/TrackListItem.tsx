import { TouchableHighlight, Image, StyleSheet, View } from 'react-native';
import { Track, useActiveTrack, useIsPlaying } from 'react-native-track-player';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import LoaderKit from 'react-native-loader-kit';

export type TrackListItemProps = {
  track: Track
  onTrackSelect: (track: Track) => void;
  style?: any; // Allow passing custom styles
}

export const TrackListItem = ({track, onTrackSelect: handleTrackSelect, style}: TrackListItemProps) => {
  const {playing} = useIsPlaying();
  const isActiveTrack = useActiveTrack()?.url === track.url;

  return (
     <TouchableHighlight 
       onPress={() => handleTrackSelect(track)} 
       underlayColor="#f0f0f0"
       style={[styles.container, style]} // Apply passed styles here
     >
      <View style={styles.trackItemContainer}>
        <View style={styles.trackImageContainer}>
          {/* Corrected to use track.artwork which is the correct property from the API */}
          <Image source={{ 
            uri: track.artwork as string
          }} style={{
            ...styles.trackImage,
            opacity: isActiveTrack ? 0.6 : 1
          }} />

          {isActiveTrack && ( playing ? (
            <LoaderKit style={styles.trackPlayingIconIndicator} name="AudioEqualizer" color="#fff" />
            ) : (
            <MaterialCommunityIcons style={styles.trackPausedIndicator} name="play" size={32} color="#f27622" /> 
          ))}
        </View>
        <View style={styles.trackInfoContainer}>
          <View style={{ flex:1, width:'100%'}}>
            <ThemedText 
              numberOfLines={2} 
              style={[
                styles.trackTitleText,
                { color: isActiveTrack ? "#f27622": "#000" }
              ]}>
              {track.title}
            </ThemedText>
            <ThemedText 
              numberOfLines={1} 
              style={[
                styles.trackDateText,
                { color: isActiveTrack ? "#f27622": "#888" }
              ]}>
              {new Date(track.date).toDateString()}
            </ThemedText>
          </View>
          <MaterialCommunityIcons name="dots-horizontal" size={25} color={isActiveTrack ? '#f27622' : '#000'} />
        </View>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff', // Each item has a white background
    paddingHorizontal: 20, 
    paddingVertical: 10,
  },
  trackItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackPlayingIconIndicator: {
    position:'absolute',
    top: 18,
    left: 18,
    width:24,
    height:24,
  },
  trackPausedIndicator: {
    position:'absolute',
    top:14,
    left:14,
  },
  trackImageContainer: {
    borderRadius: 8,
    overflow:'hidden',
  },
  trackImage: {
    width:60,
    height:60
  },
  trackInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 15,
  },
  trackDateText: {
    fontSize: 14,
    marginTop: 4,
  },
  trackTitleText: {
    fontSize: 16,
    fontWeight:'600',
  }
})

