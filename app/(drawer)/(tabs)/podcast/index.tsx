import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, TextInput, FlatList } from 'react-native';
import { TrackListItem } from '@/components/podcast/TrackListItem';
import { fetchTrackData } from '@/model/PodcastAPI';
import { episodeTitleFilter } from '@/helpers/filters';
import LoaderKit from 'react-native-loader-kit';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import TrackPlayer, { Track } from 'react-native-track-player';

export default function PodcastScreen() {
  const [episodes, setEpisodes] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const insets = useSafeAreaInsets();

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const fetchEpisodes = async () => {
    setIsLoading(true);
    try {
      const ep = await fetchTrackData();
      const uniqueEpisodes = ep.filter((track, index, self) =>
        index === self.findIndex((t) => t.url === track.url)
      );
      setEpisodes(uniqueEpisodes);
    } catch (error) {
      console.error("Failed to fetch podcast episodes:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleTrackSelect = async (track: Track) => {
    await TrackPlayer.reset();
    await TrackPlayer.add(track);
    await TrackPlayer.play();
  }

  const filteredEpisodes = useMemo(() => {
    if (!search) return episodes;
    return episodes.filter(episodeTitleFilter(search));
  }, [search, episodes]);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <LoaderKit style={styles.loader} name="LineScalePulseOutRapid" color="#f27622" />
      </View>
    );
  }

  // The Header component will be rendered at the top of the FlatList.
  const ListHeader = (
    <View>
      <View style={styles.topSegment}>
        {/* The Search Bar now comes before the title */}
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={24} color="#888" />
          <TextInput 
            style={styles.searchInput} 
            placeholder="Find an episode"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <ThemedText style={styles.title}>Add Passion & Stir</ThemedText>
      </View>
      {/* This empty view creates the 2px space between segments */}
      <View style={{height: 2}} /> 
    </View>
  );

  // The Empty component is shown when the list has no items.
  const ListEmpty = (
     <View style={styles.emptyContainer}>
        <MaterialCommunityIcons name="podcast" size={80} color="#ccc" style={{marginBottom: 20}}/>
        <ThemedText style={styles.emptyContainerText}>No Episodes Found</ThemedText>
        <ThemedText style={{color: '#888'}}>Could not fetch episodes at this time.</ThemedText>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* The entire screen is now a single FlatList */}
      <FlatList 
        data={filteredEpisodes}
        contentInsetAdjustmentBehavior="automatic"
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={ListEmpty}
        renderItem={({ item, index }) => (
          // We wrap the item in a View to handle the corner rounding
          <View 
            style={[
              styles.listItemWrapper,
              index === 0 && styles.firstItemStyles,
              index === filteredEpisodes.length - 1 && styles.lastItemStyles,
            ]}
          >
            <TrackListItem 
              track={item}
              onTrackSelect={handleTrackSelect}
            />
          </View>
        )}
        keyExtractor={(item) => item.url}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loader: {
    width: 100,
    height: 100,
  },
  topSegment: {
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingBottom: 20,
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
  },
  searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      paddingHorizontal: 15,
      marginBottom: 20,
  },
  searchInput: {
      flex: 1,
      paddingVertical: 12,
      marginLeft: 10,
      fontSize: 16,
  },
  listItemWrapper: {
    backgroundColor: '#fff', // The wrapper provides the background color
    marginHorizontal: 4,
  },
  firstItemStyles: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden', // This is crucial to clip the content
  },
  lastItemStyles: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    overflow: 'hidden',
  },
  emptyContainer: {
    backgroundColor:"#fff",
    alignItems: 'center',
    paddingVertical: 80,
    borderRadius: 25,
    marginHorizontal: 4,
  },
  emptyContainerText: {
    fontSize: 24,
    fontWeight:'bold',
    color:"#000",
    textAlign:'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginLeft: 95, // Aligns with text start (20 padding + 60 image + 15 margin)
  },
});

