const parseString = require('react-native-xml2js').parseString;
const xmlPodcastURL = 'https://shareourstrength.org/feed/podcast/';

export const fetchMP3DataFromXML = async () => {
  const audioArray = [];
  try {
    await fetch(xmlPodcastURL)
    .then(response => response.text())
    .then((result) => {
      parseString(result, function(err, res) {
        (res.rss.channel[0].item).map((episode, index) => {
          audioArray.push({
            title: episode.title[0], 
            url: episode.enclosure[0].$.url,
            image: episode['itunes:image'][0].$.href,
          });
        });
        //console.log(res.rss.channel[0].item[0]['itunes:image'][0].$.href);
        //console.log(res.rss.channel[0].item[0].enclosure[0].$.url);
      });
    });
    return audioArray;
  } catch (error) {
    console.error(error);
  }
};