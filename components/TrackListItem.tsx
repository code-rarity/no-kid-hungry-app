import { TouchableHighlight, Image, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

export type TrackListItemProps = {
  track: {title: string, image?: string,  }
}

export const TrackListItem = ({track}: TrackListItemProps) => {
  const isActiveTrack = false;

  return (
     <TouchableHighlight style={{marginVertical:10}}>
      <ThemedView style={styles.trackItemContainer}>
        <ThemedView>
          <Image source={{ 
            uri: track.image 
          }} 
          style={{
            ...styles.trackImage,
            opacity: isActiveTrack ? 0.6 : 1
          }} />
        </ThemedView>
        <ThemedView style={{width:'100%'}}>
          <ThemedText numberOfLines={1} style={{
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
    paddingRight:20,
  },
  trackImage: {
    width:60,
    height:60,
    borderRadius:15,
  },
  trackTitleText: {
    fontSize: 14,
    fontWeight:'bold',
    maxWidth: '90%',
  }
})
