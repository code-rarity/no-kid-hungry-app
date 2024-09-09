import { TouchableHighlight, Image, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import LoaderKit from 'react-native-loader-kit';
import { Colors } from '@/constants/Colors';

export type EventListItemProps = {
  event: any
}

export const EventListItem = ({event}: EventListItemProps) => {
  return (
     <TouchableHighlight style={{marginVertical:10}}>
      <ThemedView style={styles.eventItemContainer}>
        <ThemedView style={{
            ...styles.eventImageContainer
          }}>
          <Image source={{ 
            uri: event.image 
          }} style={{
            ...styles.eventImage
          }} />
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
                ...styles.eventTitleText,
                color:'#000'
              }}>
              {event.title}
            </ThemedText>
            <ThemedText 
              numberOfLines={1} 
              style={{
                ...styles.eventDateText,
                color:'#000'
              }}>
              {event.event_day} {event.event_month} {event.event_year}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  eventItemContainer: {
    flexDirection: 'row',
    columngap: 14,
    alignItems: 'center',
    backgroundColor:'#fff',
    overflow:'hidden',
  },
  eventPlayingIconIndicator: {
    position:'absolute',
    fontWeight:'bold',
    top:15,
    left:18,
    width:24,
    height:24,
  },
  eventPausedIndicator: {
    position:'absolute',
    top:14,
    left:14,
  },
  eventImageContainer: {
    borderRadius:20,
    overflow:'hidden',
  },
  eventImage: {
    width:60,
    height:60
  },
  eventDateText: {
    fontSize: 12,
    fontWeight:'bold',
    maxWidth: '90%',
    backgroundColor:'#fff'
  },
  eventTitleText: {
    fontSize: 16,
    fontWeight:'bold',
    maxWidth: '90%',
    backgroundColor:'#fff'
  }
})
