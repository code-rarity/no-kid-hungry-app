import { TouchableHighlight, Image, StyleSheet } from 'react-native';
import { Track } from 'react-native-track-player';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

export type TrackListItemProps = {
  track: Track
}

export const TrackListItem = ({track}: TrackListItemProps) => {
  const isActiveTrack = false;

  return (
     <TouchableHighlight style={{marginVertical:10}}>
      <ThemedView style={styles.trackItemContainer}>
        <ThemedView style={{
            ...styles.trackImageContainer
          }}>
          <Image source={{ 
            uri: track.image 
          }} style={{
            ...styles.trackImage,
            opacity: isActiveTrack ? 0.6 : 1
          }} />
        </ThemedView>
        <ThemedView style={{width:'100%', marginLeft:15}}>
          <ThemedText numberOfLines={2} style={{
            ...styles.trackTitleText,
            color: isActiveTrack ? Colors.light.text: Colors.dark.text
          }}>{track.title}</ThemedText>
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
