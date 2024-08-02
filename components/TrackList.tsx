import { FlatList } from 'react-native';
import { TrackListItem } from '@/components/TrackListItem';
import { ThemedView } from '@/components/ThemedView';

export type TrackListProps = Partial<FlatListProps<unknown>>

const ItemDivider = () => {
  <ThemedView style={{marginVertical: 9, marginLeft:60}} />
}

export const TrackList = ({tracks, ...flatlistProps}: TrackListProps) => {
  return (
    <FlatList 
      data={tracks}
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
      ItemSeparatorComponent={ItemDivider}
      renderItem={({item: track}) => (
        <TrackListItem 
          track={track}
        /> 
      )}
      {...flatlistProps}
    />
  )
}