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
    fetchImpactStories();
  }, []);

  const fetchImpactStories = async () => {
    const mediaArray = [];
    try {
      await fetch(`https://stories.nokidhungry.org/wp-json/wp/v2/pages?filter[orderby]=date&order=desc&per_page=10&offset=${offset}`)
      .then(rep1 => rep1.json())
      .then(res1 => {
        (res1).map((story) => {
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

  return (
    /* Customized impact homescreen to personalize the donor journey inside the macro mission */
    <ThemedView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ paddingHorizontal: screenPadding.horizontal }}>
        
        <ThemedText style={{fontWeight:'bold', paddingTop:20, paddingLeft:5, paddingBottom:15}}>HELP WITH AN ISSUE</ThemedText>
        <Carousel
          width={width/3}
          height={40}
          style={{
            width:width,
            overflow:'visible',

          }}
          autoPlay={false}
          data={[ "School Meals", "Summer Meals", "SNAP", "Afterschool" ]}
          scrollAnimationDuration={1000}
          renderItem={({ item: category }) => (
            <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center', borderWidth:1, borderRadius:20, borderColor:'#000', marginLeft:5, marginRight:5}}>
              <ThemedView>
                <ThemedText>{category}</ThemedText>
              </ThemedView>
            </TouchableOpacity>
          )}
        />

        <ThemedText style={{fontWeight:'bold', paddingTop:20, paddingLeft:5, paddingBottom:15}}>YOUR GIVING JOURNEY</ThemedText>

        <ThemedView style={{flex:1, height:400, backgroundColor:'#ededed', overflow:'visible', borderRadius:40}}>
          <ThemedText style={{flex:1, justifyContent:'center', alignItems:'center', textAlign:'center'}}>A timeline of your giving</ThemedText>
        </ThemedView>

        <ThemedText style={{fontWeight:'bold', paddingTop:20, paddingLeft:5, paddingBottom:15}}>READ STORIES OF IMPACT</ThemedText>
        <Carousel
            width={width*0.72}
            height={80}
            style={{ 
              width: width,
              overflow:'visible',
            }}
            autoPlay={false}
            data={stories}
            scrollAnimationDuration={1000}
            //onSnapToItem={(index) => console.log('current index:', index)}
            renderItem={({ item: story }) => (
              <TouchableOpacity style={{flex:1}}>
                <Image source={{ uri: story.image }} style={{alignItems:'flex-start', width:width/1.5, height:80, borderRadius: 25}} />
                <ThemedView>
                  <ThemedText>{story.title}</ThemedText>
                </ThemedView>
              </TouchableOpacity>
            )}
        />

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