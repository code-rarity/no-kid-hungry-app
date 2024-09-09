import { FlatList, StyleSheet, Dimensions } from 'react-native';
import { TrackListItem } from '@/components/podcast/TrackListItem';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import TrackPlayer, { Track } from 'react-native-track-player';
import LoaderKit from 'react-native-loader-kit';
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
          <LoaderKit style={styles.tracksLoadingIconIndicator} name="LineScalePulseOutRapid" color="#e3dd2b" />
          <ThemedText style={styles.emptyContainerText}>Episodes are loading...</ThemedText>
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
    height: Dimensions.get('window').height,
    backgroundColor:"#fff",
    alignItems: 'center',
  },
  emptyContainerText: {
    backgroundColor:"#fff",
    fontSize: 24,
    fontWeight:'bold',
    color:"#000",
    textAlign:'center',
  },
  tracksLoadingIconIndicator: {
    fontWeight:'bold',
    marginTop:180,
    marginBottom:40,
    width:180,
    height:180,
  },
})