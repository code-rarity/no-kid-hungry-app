import { useState } from "react";
const parseString = require('react-native-xml2js').parseString;
const xmlPodcastURL = "https://shareourstrength.org/feed/podcast/";

// ** Functions for displaying and interacting with podcast episodes ** //

export const fetchMP3DataFromXML = async () => {
  const tracks = [];
  try {
    await fetch(xmlPodcastURL)
    .then(response => response.text())
    .then((result) => {
      parseString(result, function(err, res) {
        (res.rss.channel[0].item).map((episode, index) => {
          tracks.push({
            title: episode.title[0], 
            url: episode.enclosure[0].$.url,
            image: episode['itunes:image'][0].$.href,
          });
        });
      });
    });
    return tracks;
  } catch (error) {
    console.log(error);
  }
};