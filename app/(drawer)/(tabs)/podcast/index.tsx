import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Image, Platform, FlatList, TouchableHighlight, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigationSearch } from '@/hooks/useNavigationSearch';
import { TrackList } from '@/components/TrackList';
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
                image: res.rss.channel[0].item[0]['itunes:image'][0].$.href,
                desc: episode.description[0],
                mp3: episode.enclosure[0].$.url,
              }
            ]);
          });
          //console.log(res.rss.channel[0].item[0]['itunes:image'][0].$.href);
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
    }
  });

  const filteredEpisodes = useMemo(() => {
    if(!search) return episodes;

    return episodes.filter(episodeTitleFilter(search));
  }, [search, episodes]);

  return (
    <ThemedView>
      <ScrollView contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}>
        <TrackList scrollEnabled={false} tracks={filteredEpisodes} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  h1: {
    fontSize: 100,
    fontWeight: 'bold',
    lineHeight: 'normal',
  },
  h2: {
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 36,
  },
  h3: {
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  p: {
    fontSize: 16,
  },
  small: {
    fontSize:14,
  },
  episodecontainer: {
    flex:1,
  },
  episodecard: {
    flex:1,
    marginTop:10,
    marginBottom:10,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  episodeimg: {
    width: 60,
    height:60,
    marginRight:15,
    borderRadius:20
  },
  episodecarddetails: {
    flex:1,
  },
});
