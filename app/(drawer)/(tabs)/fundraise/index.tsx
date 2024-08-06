import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Platform, TouchableOpacity, FlatList, useWindowDimensions, Linking } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import RenderHtml from 'react-native-render-html';

export default function FundraiseScreen() {
  const navigation = useNavigation();
  const [campaigns, setCampaigns] = useState([]);
  const [images, setImages] = useState([]);
  const { width } = useWindowDimensions();

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    const mediaArray = [];
    try {
      await fetch(`https://fundraise.nokidhungry.org/wp-json/wp/v2/campaign`)
      .then(rep1 => rep1.json())
      .then(res1 => {
        (res1).map((campaign, i) => {
          fetch(`https://fundraise.nokidhungry.org/wp-json/wp/v2/media/${campaign.featured_media}`)
          .then(rep2 => rep2.json())
          .then(res2 => {
            setCampaigns(prevCampaigns => [
              ...prevCampaigns,
              {
                title: campaign.title.rendered,
                date: campaign.date,
                link: campaign.link,
                image: (res2.source_url ? res2.source_url : 'https://www.nokidhungry.org/sites/default/files/styles/mobile_2x_scale/public/2023-03/homepage_hero_v3.jpg.webp?itok=R0XglCQC'),
                content: campaign.content.rendered,
              }
            ]);
          })
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={campaigns}
        style={{padding:15}}
        ListHeaderComponent={() => (
          <ThemedView>
            <ThemedText style={styles.h2}>Create a fundraiser</ThemedText>
          </ThemedView>
        )}
        ListFooterComponent={() => (
          <ThemedText>Load More</ThemedText>
        )}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() => Linking.openURL(item.link)} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.img} />
            <ThemedView style={styles.carddetails}>
              <ThemedText style={styles.h3}>{item.title}</ThemedText>
            </ThemedView>
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
}

const tagsStyles = {
  a: {
    fontSize:16,
    lineHeight:'normal'
  },
  p: {
    fontSize:16,
    lineHeight:'normal'
  },
  li: {
    fontSize: 16,
    lineHeight:'normal'
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  h1: {
    fontSize: 100,
    fontWeight: 'bold',
    lineHeight: 'normal',
    color: '#F26722',
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
  img: {
    width:'100%',
    height:180,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  card: {
    flex:1,
    marginTop: 15,
    marginBottom:15,
  },
  carddetails: {
    paddingTop:15,
    paddingLeft:25,
    paddingRight:25,
    paddingBottom:50,
    backgroundColor: '#FDB917',
    borderBottomLeftRadius:40,
    borderBottomRightRadius:40,
  },
  p: {
    fontSize: 16,
    paddingTop: 10,
  },
  small: {
    fontSize:12,
  }
});