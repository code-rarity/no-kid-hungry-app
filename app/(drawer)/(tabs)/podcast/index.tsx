import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useNavigationSearch } from '@/hooks/useNavigationSearch';
import { TrackList } from '@/components/podcast/TrackList';
import { screenPadding } from '@/constants/Layout';
import { fetchPodcastTracks } from '@/model/podcastAPI';
import { episodeTitleFilter } from '@/helpers/filters';

export default function PodcastScreen() {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetchTracks();
  }, []);

  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder:'Find an episode',
      tintColor: "white",
      textColor: "white",
    }
  });

  const fetchTracks = async () => {
    await fetchPodcastTracks().then(response => {
      console.log(response);
    });
  }

  const filteredEpisodes = useMemo(() => {
    if(!search) return episodes;

    return episodes.filter(episodeTitleFilter(search));
  }, [search, episodes]);

  return (
    <ThemedView style={{flex:1}}>
      <ScrollView contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}>
        <TrackList scrollEnabled={false} tracks={filteredEpisodes} />
      </ScrollView>
    </ThemedView>
  );
}