import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useNavigationSearch } from '@/hooks/useNavigationSearch';
import { TrackList } from '@/components/podcast/TrackList';
import { screenPadding } from '@/constants/Layout';
import { fetchMP3DataFromXML } from '@/model/podcastAPI';
import { episodeTitleFilter } from '@/helpers/filters';

export default function PodcastScreen() {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetchPodcastAudioTracks();
  }, []);

  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder:'Find an episode',
      tintColor: "white",
      textColor: "white",
    }
  });

  const fetchPodcastAudioTracks = async () => {
    const wordPressURL = "https://dev-share-our-strength1.pantheonsite.io";

    try {
      await fetchMP3DataFromXML()
      .then((trackList) => {
        const episodes = [];
        fetch(`${wordPressURL}/wp-json/wp/v2/podcast?filter[orderby]=date&order=desc`)
        .then(rep1 => rep1.json())
        .then(res1 => {
          (res1).map((episode, i) => {
            fetch(`${wordPressURL}/wp-json/wp/v2/media/${episode.featured_media}`)
            .then(rep2 => rep2.json())
            .then(res2 => {
              trackList.map((track, j) => {
                if(track.title == episode.title.rendered) {
                  setEpisodes(prevEpisodes => [
                    ...prevEpisodes,
                    {
                      title: episode.title.rendered,
                      date: (episode.date).split("T")[0],
                      link: episode.link,
                      image: (res2.source_url ? res2.source_url : track.image),
                      content: episode.content.rendered,
                      url: track.url,
                    }
                  ]);
                }
              });
            })
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
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