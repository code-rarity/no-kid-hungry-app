import { FlatList } from 'react-native';
import { TrackListItem } from '@/components/podcast/TrackListItem';
import { ThemedView } from '@/components/ThemedView';
import TrackPlayer, { Track } from 'react-native-track-player';

export type TrackListProps = Partial<FlatListProps<Track>> & {
  tracks: Track[]
}

const ItemDivider = () => {
  <ThemedView style={{marginVertical: 9, marginLeft:60}} />
}

export const TrackList = ({tracks, ...flatlistProps}: TrackListProps) => {

  const handleTrackSelect = async (track: Track) => {
    await TrackPlayer.load(track);
    await TrackPlayer.play();
  }

  return (
    <FlatList 
      data={tracks}
      contentContainerStyle={{ paddingTop: 0, paddingBottom: 128 }}
      ItemSeparatorComponent={ItemDivider}
      renderItem={({item: track}) => (
        <TrackListItem 
          track={track}
          onTrackSelect={handleTrackSelect}
        /> 
      )}
      {...flatlistProps}
    />
  )
}