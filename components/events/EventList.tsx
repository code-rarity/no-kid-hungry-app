import { FlatList, StyleSheet, Dimensions } from 'react-native';
import { EventListItem } from '@/components/events/EventListItem';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import LoaderKit from 'react-native-loader-kit';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const ItemDivider = () => {
  <ThemedView style={{marginVertical: 9, marginLeft:60}} />
}

export const EventList = ({events, ...flatlistProps}) => {
  return (
    <FlatList 
      data={events}
      contentContainerStyle={{ paddingTop: 0, paddingBottom: 128 }}
      ItemSeparatorComponent={ItemDivider}
      renderItem={({item: event}) => (
        <EventListItem 
          event={event}
        /> 
      )}
    />
  )
}