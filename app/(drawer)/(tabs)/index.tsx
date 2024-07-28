import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Platform, TouchableOpacity, FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function StoriesScreen() {
  const navigation = useNavigation();

  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const mediaArray = [];
    try {
      // Need to set this to prod site on live and enabled JSON:API module in Drupal
      await fetch(`https://dev-no-kid-hungry.pantheonsite.io/jsonapi/node/blog?page[limit]=10&page[offset]=${offset}&include=field_image_featured.field_image&fields[file--file]=uri,url&sort=-created`)
      .then(response => response.json())
      .then(result => {
        (result.included).map((media, j) => {
          if(media.type == "file--file") {
            mediaArray.push(media.attributes.uri.url);
          }
        });

        (result.data).map((post, i) => {
          setPosts(prevPosts => [
            ...prevPosts,
            {
              title: post.attributes.title,
              date: post.attributes.field_date_simple,
              excerpt: post.attributes.field_teaser.value,
              content: post.attributes.body.processed,
              image: 'https://dev-no-kid-hungry.pantheonsite.io' + mediaArray[i],
            }
          ]);
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  const handleMore = async() => {
    setOffset(prevOffset => prevOffset + 10)
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={posts}
        style={{padding:15}}
        ListHeaderComponent={() => (
          <ThemedView>
            <ThemedText style={styles.h1}>No Kid Hungry</ThemedText>
            <ThemedText style={styles.h2}>Millions of kids live in hunger today. Let's end child hunger together.</ThemedText>
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
    marginTop: 25,
    marginBottom:25,
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