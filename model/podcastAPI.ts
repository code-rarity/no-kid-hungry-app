import { mergeObjects } from "@/helpers/misc";
const parseString = require('react-native-xml2js').parseString;
const xmlPodcastURL = "https://shareourstrength.org/feed/podcast/";
const wordPressURL = "https://dev-share-our-strength1.pantheonsite.io";

// ** Functions for displaying and interacting with podcast episodes ** //

export const fetchTrackData = async () => {
  try {
    Promise.all([
      fetch(`${wordPressURL}/wp-json/wp/v2/podcast?filter[orderby]=date&order=desc`).then(response => response.json()),
      fetch(xmlPodcastURL).then(response => response.text())
    ]).then((data) => {
      const mediaArray = [];
      const trackArray = [];
      const episodeArray = [];
      const tracks = [];

      // We map the WordPress data to add the episode title and create a array of fetches for episode images
      data[0].map((episode, i) => {
        episodeArray.push({ 
          title: episode.title.rendered,
          date: (episode.date).split("T")[0],
          link: episode.link,
          content: episode.content.rendered,
        });
        mediaArray.push(fetch(`${wordPressURL}/wp-json/wp/v2/media/${episode.featured_media}`).then(response => response.json()));
      });

      // Another Promise.all to process all the img requests
      return Promise.all(mediaArray)
      .then((imgData) => {
        parseString(data[1], function(err, res) {
          // Clean up xml data from website into usable array
          (res.rss.channel[0].item).map((track, index) => {
            trackArray.push({
              title: track.title[0], 
              url: track.enclosure[0].$.url,
              image: track['itunes:image'][0].$.href,
            });
          });

          // Map usable array using key title to match up with epsiodes array
          const trackArrayMap = new Map(trackArray.map(o => [o.title, o]));

          // Combine both arrays using spread operator
          episodeArray.map(o => {
            const track = trackArrayMap.get(o.title) || {};
            tracks.push(mergeObjects(o, track));
          });
        });
        return tracks;
      });
    });
  } catch(error) {
    console.log(error);
  }
};

   /*(dataArray[1]).map((episode, i) => {
      fetch(`${wordPressURL}/wp-json/wp/v2/media/${episode.featured_media}`)
      .then(rep2 => rep2.json())
      .then(res2 => {
        trackList.map((track, j) => {
          if(track.title == episode.title.rendered) {
            console.log("This ran");
            episodes.push({
              title: episode.title.rendered,
              date: (episode.date).split("T")[0],
              link: episode.link,
              image: (res2.source_url ? res2.source_url : track.image),
              content: episode.content.rendered,
              url: track.url,
            });
          }
        });
      })
    });

    console.log(episodes);*/

/*
const fetchMP3DataFromXML = async () => {
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

export const fetchPodcastAudioTracks = async () => {
  const wordPressURL = "https://dev-share-our-strength1.pantheonsite.io";
  const episodes = [];
  try {
    await fetchMP3DataFromXML()
    .then((trackList) => {
      fetch(`${wordPressURL}/wp-json/wp/v2/podcast?filter[orderby]=date&order=desc`)
      .then(rep1 => rep1.json())
      .then(res1 => {
        (res1).map((episode, i) => {
          fetch(`${wordPressURL}/wp-json/wp/v2/media/${episode.featured_media}`)
          .then(rep2 => rep2.json())
          .then(res2 => {
            trackList.map((track, j) => {
              if(track.title == episode.title.rendered) {
                episodes.push({
                  title: episode.title.rendered,
                  date: (episode.date).split("T")[0],
                  link: episode.link,
                  image: (res2.source_url ? res2.source_url : track.image),
                  content: episode.content.rendered,
                  url: track.url,
                });
              }
            });
          })
        });
      });
    });
    return episodes;
  } catch (error) {
    console.log(error);
  }
}
  */