import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Image, Platform, FlatList, TouchableHighlight, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigationSearch } from '@/hooks/useNavigationSearch';
import { TrackList } from '@/components/podcast/TrackList';
import { screenPadding } from '@/constants/Layout';

// place this in first layout file or before to pre-load data
import { fetchMP3DataFromXML } from '@/helpers/services';

import { episodeTitleFilter } from '@/helpers/filters';
const parseString = require('react-native-xml2js').parseString;

export default function PodcastScreen() {
  const [episodes, setEpisodes] = useState([]);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchEpisodes();
  }, []);


  const fetchEpisodes = async () => {
    const mediaArray = [];
    const audioArray = await fetchMP3DataFromXML();

    if(!audioArray) {
      console.log("Figure out a way to change empty container text in component");
    }

    try {
      await fetch(`https://dev-share-our-strength1.pantheonsite.io/wp-json/wp/v2/podcast?filter[orderby]=date&order=desc&page=${page}&per_page=10&offset=${offset}`)
      .then(rep1 => rep1.json())
      .then(res1 => {
        (res1).map((episode, i) => {
          fetch(`https://dev-share-our-strength1.pantheonsite.io/wp-json/wp/v2/media/${episode.featured_media}`)
          .then(rep2 => rep2.json())
          .then(res2 => {
            (audioArray).map((audioFile, j) => {
              if(audioFile.title == episode.title.rendered) {
                setEpisodes(prevEpisodes => [
                  ...prevEpisodes,
                  {
                    title: episode.title.rendered,
                    date: (episode.date).split("T")[0],
                    link: episode.link,
                    image: (res2.source_url ? res2.source_url : audioFile.image),
                    content: episode.content.rendered,
                    url: audioFile.url,
                  }
                ]);
              }
            });
          })
        });
        setPage(prevPage => prevPage + 1);
        setPage(prevOffset => prevOffset + 10);
      });
    } catch (error) {
      console.error(error);
    }
  }

  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder:'Find an episode',
      textColor: "white",
      placeholderTextColor: "white",
    }
  });

  const filteredEpisodes = useMemo(() => {
    if(!search) return episodes;

    return episodes.filter(episodeTitleFilter(search));
  }, [search, episodes]);

  return (
    <ThemedView style={{height:'100%', backgroundColor:'#000'}}>
      <ScrollView contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}>
        <TrackList scrollEnabled={false} tracks={filteredEpisodes} />
      </ScrollView>
    </ThemedView>
  );
}