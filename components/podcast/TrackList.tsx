import { FlatList, StyleSheet } from 'react-native';
import { TrackListItem } from '@/components/podcast/TrackListItem';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import TrackPlayer, { Track } from 'react-native-track-player';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
      ListEmptyComponent={
        <ThemedView style={styles.emptyContainer}>
          <ThemedText style={styles.emptyContainerText}>No episodes found!</ThemedText>
          <MaterialCommunityIcons name="podcast" size={100} color={"#fff"} />

        </ThemedView>
      }
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

const styles = StyleSheet.create({
  emptyContainer: {
    flex:1,
    height:'100%',
    backgroundColor:"#000",
    justifyContent:'center',
    alignItems: 'center',
  },
  emptyContainerText: {
    backgroundColor:"#000",
    color:"#fff",
    textAlign:'center',
    marginTop:20,
    marginBottom:20
  }
})