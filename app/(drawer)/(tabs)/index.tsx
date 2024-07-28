import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Platform, TouchableOpacity, FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function StoriesScreen() {
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // Need to set this to prod site on live and enabled JSON:API module in Drupal
      await fetch(`https://dev-no-kid-hungry.pantheonsite.io/jsonapi/node/blog?page[limit]=10&page[offset]=${offset}&include=field_image_featured.field_image&fields[file--file]=uri,url&sort=-created`)
      .then(response => response.json())
      .then(result => {
        (result.data).map((post, i) => {
          setPosts(prevPosts => [
            ...prevPosts,
            {
              id: post.id,
              title: post.attributes.title,
              date: post.attributes.field_date_simple,
              excerpt: post.attributes.field_teaser.value,
              content: post.attributes.body.processed,
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
    <ThemedView style={{flex:1}}>
      <FlatList
        data={posts}
        ListHeaderComponent={() => (
          <ThemedView>
            <ThemedText>No Kid Hungry</ThemedText>
            <ThemedText>Millions of kids live in hunger today. Let's end child hunger together.</ThemedText>
          </ThemedView>
        )}
        ListFooterComponent={() => (
          <ThemedText>Load More</ThemedText>
        )}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity key={item.id} onPress={() => ''} style={{flex:1}}>
            <ThemedText>{item.date}</ThemedText>
            <ThemedText>{item.title}</ThemedText>
            <ThemedText>{item.excerpt}</ThemedText>
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
}
