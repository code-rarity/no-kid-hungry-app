import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Platform, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { screenPadding } from '@/constants/Layout';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Carousel from 'react-native-reanimated-carousel';

export default function HomeScreen() {
  const width = Dimensions.get('window').width;
  const navigation = useNavigation();

  const [stories, setStories] = useState([]);
  const [images, setImages] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    const mediaArray = [];
    try {
      await fetch(`https://stories.nokidhungry.org/wp-json/wp/v2/pages?filter[orderby]=date&order=desc&per_page=10&offset=${offset}`)
      .then(rep1 => rep1.json())
      .then(res1 => {
        (res1).map((story, i) => {
          fetch(`https://stories.nokidhungry.org/wp-json/wp/v2/media/${story.featured_media}`)
          .then(rep2 => rep2.json())
          .then(res2 => {
            setStories(prevStories => [
              ...prevStories,
              {
                title: story.title.rendered,
                date: story.date,
                link: story.link,
                image: (res2.source_url ? res2.source_url : 'https://www.nokidhungry.org/sites/default/files/styles/mobile_2x_scale/public/2023-03/homepage_hero_v3.jpg.webp?itok=R0XglCQC'),
                content: story.content.rendered,
              }
            ]);
          })
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  /*const handleMore = async() => {
    setOffset(prevOffset => prevOffset + 10)
  }*/

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}>
        <ThemedText style={{fontWeight:'bold', paddingTop:20, paddingLeft:5, paddingBottom:20}}>IMPACT STORIES</ThemedText>
        <Carousel
            width={width*0.72}
            height={80}
            style={{ width: width }}
            autoPlay={false}
            data={stories}
            scrollAnimationDuration={1000}
            //onSnapToItem={(index) => console.log('current index:', index)}
            renderItem={({ item: story }) => (
              <TouchableOpacity style={{flex:1}}>
                <Image source={{ uri: story.image }} style={{alignItems:'flex-start', width:width/1.5, height:80, borderRadius: 25}} />
                <ThemedView style={{position:'relative', left:10, bottom:30, padding:20, color:'#f27622', fontWeight:'bold', backgroundColor:'transparent'}}>
                  <ThemedText>{story.title}</ThemedText>
                </ThemedView>
              </TouchableOpacity>
            )}
        />
      </ScrollView>
    </ThemedView>
  );
}

/*      <FlatList
        data={stories}
        style={{padding:15}}
        ListHeaderComponent={() => (
          <ThemedView>
            <ThemedText style={styles.small}>Stories of Impact</ThemedText>
          </ThemedView>
        )}
        ListFooterComponent={() => (
          <ThemedText>Load More</ThemedText>
        )}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() => navigation.push('story', {story: item})} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.img} />
            <ThemedView style={styles.carddetails}>
              <ThemedText style={styles.small}>{item.date}</ThemedText>
              <ThemedText style={styles.h3}>{item.title}</ThemedText>
              <ThemedText style={styles.p}>{item.excerpt}</ThemedText>
            </ThemedView>
          </TouchableOpacity>
        )}
      />
      */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  h1: {
    fontSize: 100,
    fontWeight: 'bold',
    lineHeight: 100,
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
    height:80,
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