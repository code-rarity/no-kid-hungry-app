import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Image, Platform, FlatList, TouchableHighlight, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigationSearch } from '@/hooks/useNavigationSearch';
import { TrackList } from '@/components/podcast/TrackList';
import { screenPadding } from '@/constants/Layout';
import { episodeTitleFilter } from '@/helpers/filters';

const parseString = require('react-native-xml2js').parseString;

export default function PodcastScreen() {
  const [episodes, setEpisodes] = useState([]);
  const [images, setImages] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const fetchEpisodes = async () => {
    const mediaArray = [];
    try {
      await fetch("https://shareourstrength.org/feed/podcast/")
      .then(response => response.text())
      .then((result) => {
        parseString(result, function(err, res) {
          (res.rss.channel[0].item).map((episode, index) => {
            setEpisodes(prevEpisodes => [
              ...prevEpisodes,
              {
                title: episode.title[0],
                date: episode.pubDate[0],
                image: episode['itunes:image'][0].$.href,
                desc: episode.description[0],
                duration: episode['itunes:duration'][0],
                url: episode.enclosure[0].$.url,
              }
            ]);
          });
          console.log(res.rss.channel[0].item[0]);//['itunes:image'][0].$.href);
          //console.log(res.rss.channel[0].item[0].enclosure[0].$.url);
        });
      })
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
    <ThemedView style={{backgroundColor:'#000'}}>
      <ScrollView contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}>
        <TrackList scrollEnabled={false} tracks={filteredEpisodes} />
      </ScrollView>
    </ThemedView>
  );
}