import React from "react";
import { StyleSheet, Image, Platform, useWindowDimensions, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import RenderHtml from 'react-native-render-html';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function StoryScreen() {
  const route = useRoute();
  const { width } = useWindowDimensions();
 // const { title, date, content, image } = route.params.story;

  const source = {
    //html: content
  };

  return (
    <ThemedView style={styles.container}>

    </ThemedView>
  );
}

/*
      <ScrollView>
        <Image source={{ uri: image }} style={styles.img_banner} />
        <ThemedView style={{padding: 15}}>
          <ThemedText style={styles.small}>{date}</ThemedText>
          <ThemedText style={styles.h3}>{title}</ThemedText>
          <RenderHtml source={source} contentWidth={width} tagsStyles={tagsStyles} />
        </ThemedView>
      </ScrollView>
      */

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
  img_banner: {
    width:'100%',
    height:180,
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