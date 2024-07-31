import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Image, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

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
                desc: episode.description[0],
                mp3: episode.enclosure[0].$.url,
              }
            ]);
          });
          console.log(episodes);
          //console.log(res.rss.channel[0].item[0].enclosure[0].$.url);
        });
      })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ThemedView>
    </ThemedView>
  );
}
