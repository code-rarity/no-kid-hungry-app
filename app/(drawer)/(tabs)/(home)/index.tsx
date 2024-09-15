import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { screenPadding } from '@/constants/Layout';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Carousel from 'react-native-reanimated-carousel';
import CategoryDonateModal from '@/components/modals/CategoryDonateModal';
import { LoggedInUserDetails } from '@/components/account/LoggedInAccountDetails';
import { FlatList } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const width = Dimensions.get('window').width;
  const navigation = useNavigation();
  const [stories, setStories] = useState([]);
  const [offset, setOffset] = useState(0);
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState();

  useEffect(() => {
    fetchImpactStories();
  }, []);

  const userDonationData = [
    {
      id: 1,
      date: new Date(2012,10,30).toDateString(),
      amount: 10,
      type: "carousel",
      source: "SNAP"
    },
    {
      id: 2,
      date: new Date(2017,4,23).toDateString(),
      amount: 50,
      type: "general",
      source: "App Donation"
    },
    {
      id: 3,
      date: new Date(2021,2,12).toDateString(),
      amount: 25,
      type: "fundraiser",
      source: "Bake Sale"
    },
    {
      id: 4,
      date: new Date(2014,19,8).toDateString(),
      amount: 99,
      type: "event",
      source: "Taste Of The Nation"
    },
  ];

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

  // Toggle modal visibility & pass pressed category to modal
  const toggleModal = (category) => {
    setVisible(!visible);
    setCategory(category);
  };

  return (
    /* Customized impact homescreen to personalize the donor journey inside the macro mission */
    <ThemedView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ paddingHorizontal: screenPadding.horizontal }}>

        {true ? <LoggedInUserDetails /> : null}

        <ThemedText style={{paddingTop:25, paddingBottom:10, fontSize:12}}>DONATE TO HELP EASE CHILD HUNGER</ThemedText>
        <Carousel
          width={width/1.75}
          height={40}
          style={{
            width:width,
            overflow:'hidden',
          }}
          autoPlay={false}
          data={[ "School Meals", "Summer Meals", "SNAP", "Afterschool Meals" ]}
          scrollAnimationDuration={1000}
          renderItem={({ item: category }) => (
            <TouchableOpacity onPress={() => toggleModal(category)} style={{flex:1, justifyContent:'center', alignItems:'center', borderWidth:1, borderRadius:15, borderColor:'#000', marginRight:15}}>
              <ThemedView>
                <ThemedText style={{fontSize:14}}>{category}</ThemedText>
              </ThemedView>
            </TouchableOpacity>
          )}
        />

        <ThemedView style={{flex:1, flexDirection:'row'}}>
          <ThemedText style={{flex:1, paddingTop:20, fontSize:12}}>FEATURED FUNDRAISERS</ThemedText>
          <ThemedText style={{flex:1, paddingTop:20, fontSize:12, textAlign:'right'}}>SEE ALL</ThemedText>
        </ThemedView>

        

        <Carousel
          width={width/1.4}
          height={80}
          style={{ 
            width: width,
            overflow:'visible',
            marginTop:25
          }}
          autoPlay={false}
          data={stories}
          scrollAnimationDuration={1000}
          renderItem={({ item: story }) => (
            <TouchableOpacity onPress={() => navigation.navigate('story', {story})} style={{flex:1}}>
              <ThemedView>
                <Image source={{ uri: story.image }} style={{width:width/1.5, height:80, borderRadius: 25}} />
                <ThemedText style={{position:'absolute', bottom:0, padding: 10, color:'#fff', fontWeight:'bold'}}>{story.title}</ThemedText>
              </ThemedView>
            </TouchableOpacity>
          )}
        />

        <CategoryDonateModal visible={visible} category={category} onClose={toggleModal} />
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
  donateTimeLineEntry: {
    flex:1,
    width:'100%',
    flexDirection:'row',
    paddingTop:25,
    paddingBottom:25,
    backgroundColor:'transparent'
  },
  p: {
    fontSize: 16,
    paddingTop: 10,
  },
  small: {
    fontSize:12,
  }
});