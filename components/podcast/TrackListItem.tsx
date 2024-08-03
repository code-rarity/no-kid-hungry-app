import { TouchableHighlight, Image, StyleSheet } from 'react-native';
import { Track, useActiveTrack } from 'react-native-track-player';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors } from '@/constants/Colors';

export type TrackListItemProps = {
  track: Track
  onTrackSelect: (track: Track) => void
}

export const TrackListItem = ({track, onTrackSelect: handleTrackSelect}: TrackListItemProps) => {
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
            opacity: isActiveTrack ? 0.8 : 1
          }} />
        </ThemedView>
        <ThemedView style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor:'#000'
          }}>
          <ThemedView style={{ flex:1, backgroundColor:'#000', width:'100%', paddingLeft:15}}>
            <ThemedText numberOfLines={2} style={{
              ...styles.trackTitleText,
              color: isActiveTrack ? "#e3dd2b": "#fff"
            }}>{track.title}</ThemedText>
          </ThemedView>
          <MaterialCommunityIcons name="dots-horizontal" size={25} color={'#fff'} />
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
    backgroundColor:'#000',
    overflow:'hidden',
  },
  trackImageContainer: {
    borderRadius:20,
    overflow:'hidden',
  },
  trackImage: {
    width:60,
    height:60
  },
  trackTitleText: {
    fontSize: 14,
    fontWeight:'bold',
    maxWidth: '90%',
    backgroundColor:'#000'
  }
})
