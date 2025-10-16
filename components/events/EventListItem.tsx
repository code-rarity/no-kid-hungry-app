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
     <TouchableHighlight style={{marginVertical:10, borderRadius: 20}}>
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
            backgroundColor:'#1C1C1E' // Dark background for the text container
          }}>
          <ThemedView style={{ flex:1, backgroundColor:'transparent', width:'100%', paddingLeft:15}}>
            <ThemedText
              numberOfLines={2}
              style={{
                ...styles.eventTitleText,
                color:'#fff' // White text color
              }}>
              {event.title}
            </ThemedText>
            <ThemedText
              numberOfLines={1}
              style={{
                ...styles.eventDateText,
                color:'#ccc' // Light grey for the date
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
    columnGap: 8,
    alignItems: 'center',
    backgroundColor:'#1C1C1E', // Dark background for the item container
    overflow:'hidden',
    borderRadius: 20,
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
    overflow:'hidden',
  },
  eventImage: {
    width:60,
    height:60
  },
  eventDateText: {
    fontSize: 12,
    fontWeight:'normal',
    maxWidth: '90%',
    backgroundColor:'transparent'
  },
  eventTitleText: {
    fontSize: 16,
    fontWeight:'normal',
    maxWidth: '90%',
    backgroundColor:'transparent',
    paddingBottom: 5,
  }
})
