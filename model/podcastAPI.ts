import { parseString } from 'react-native-xml2js';
import { Track } from 'react-native-track-player';

// The CORRECT RSS feed for the "Add Passion and Stir" podcast
const PODCAST_RSS_URL = 'https://shareourstrength.org/feed/podcast/';

// This function fetches the RSS feed and parses the XML into a list of tracks
export const fetchTrackData = async (): Promise<Track[]> => {
  try {
    const response = await fetch(PODCAST_RSS_URL);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const rssText = await response.text();

    return new Promise((resolve, reject) => {
      parseString(rssText, (err, result) => {
        if (err) {
          console.error('XML Parsing Error:', err);
          reject([]);
          return;
        }

        // Navigate through the parsed XML object to find the episodes
        const items = result.rss.channel[0].item;
        if (!items) {
          console.warn('No podcast items found in RSS feed.');
          resolve([]);
          return;
        }

        // Map the XML items to the Track object format that react-native-track-player expects
        const tracks: Track[] = items.map((item: any) => {
          // Find the 'itunes:image' tag for the artwork
          const imageUrl = item['itunes:image']?.[0]?.$.href || 'https://placehold.co/512x512/f27622/fff?text=No+Art';
          
          return {
            url: item.enclosure[0].$.url,
            title: item.title[0],
            artist: 'No Kid Hungry',
            artwork: imageUrl,
            date: item.pubDate[0],
            duration: item['itunes:duration'] ? parseInt(item['itunes:duration'][0], 10) : 0,
          };
        });
        
        resolve(tracks);
      });
    });
  } catch (error) {
    console.error('Failed to fetch or parse podcast data:', error);
    return []; // Return an empty array on failure
  }
};

