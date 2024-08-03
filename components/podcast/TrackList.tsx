import { FlatList } from 'react-native';
import { TrackListItem } from '@/components/podcast/TrackListItem';
import { ThemedView } from '@/components/ThemedView';
import { Track } from 'react-native-track-player';

export type TrackListProps = Partial<FlatListProps<Track>> & {
  tracks: Track[]
}

const ItemDivider = () => {
  <ThemedView style={{marginVertical: 9, marginLeft:60}} />
}

export const TrackList = ({tracks, ...flatlistProps}: TrackListProps) => {
  return (
    <FlatList 
      data={tracks}
      contentContainerStyle={{ paddingTop: 0, paddingBottom: 128 }}
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