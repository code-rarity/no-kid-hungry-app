import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { screenPadding } from '@/constants/Layout';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Carousel from 'react-native-reanimated-carousel';
import CategoryDonateModal from '@/components/modals/CategoryDonateModal';
import { LoggedInAccountDetails } from '@/components/account/LoggedInAccountDetails';
import { parseDateString } from '@/helpers/misc';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthenticator } from "@aws-amplify/ui-react-native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const width = Dimensions.get('window').width;
  const [category, setCategory] = useState();
  const [events, setEvents] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [stories, setStories] = useState([]);
  const [visible, setVisible] = useState(false);

  const { authStatus } = useAuthenticator();

  useEffect(() => {
    fetchFeaturedEvent();
    fetchFeaturedFundraisers();
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

  const fetchFeaturedEvent = async () => {
    try {
      
      await fetch(`https://events.nokidhungry.org/wp-json/wp/v2/events?filter[orderby]=event_date&order=desc&per_page=1`)
      .then(rep => rep.json())
      .then(res => {
        res.map((event, i) => {
          //if(event.event_date) {
          // Date formatting and isolation
          const date = (event.event_date ? parseDateString(event.event_date) : new Date() );

          const event_day = date.getDate();
          const event_month = date.toLocaleString('default', { month: 'short' });
          const event_year = date.getFullYear();

          setEvents(prevEvents => [
            ...prevEvents,
            {
              title: event.title.rendered,
              event_date: event.event_date,
              event_day: event_day,
              event_month: event_month,
              event_year: event_year,
              event_type: event.event_type_name,
              link: event.link,
              image: ( event.image_paths["culinary-square"] ? event.image_paths["culinary-square"] : 'https://www.nokidhungry.org/sites/default/files/styles/mobile_2x_scale/public/2023-03/homepage_hero_v3.jpg.webp?itok=R0XglCQC' ),
              address: event.location.address,
              desc: event.yoast_head_json.description,
            }
          ]);
          //}
        });
      });
    } catch (error) {
      console.error(error);
    }    
  }

  const fetchFeaturedFundraisers = async () => {
    try {
      await fetch(`https://fundraise.nokidhungry.org/wp-json/wp/v2/campaign?per_page=3`)
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

  const fetchImpactStories = async () => {
    try {
      await fetch(`https://stories.nokidhungry.org/wp-json/wp/v2/pages?filter[orderby]=date&order=desc&per_page=10`)
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
      <ScrollView style={{paddingHorizontal: screenPadding.horizontal, flex:1}} contentContainerStyle={{paddingBottom:120}}>

        {authStatus === 'authenticated' ? <LoggedInAccountDetails /> : null}

        <ThemedText style={{paddingTop:25, paddingBottom:10, fontSize:12}}>DONATE TO HELP EASE CHILD HUNGER</ThemedText>
        <Carousel
          width={width/2.25}
          height={40}
          style={{width:width, overflow:'hidden'}}
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
          <ThemedText style={{flex:1, paddingTop:20, fontSize:12}}>FEATURED EVENT</ThemedText>
          <TouchableOpacity style={{flex:1, paddingTop:20}} onPress={() => navigation.navigate('events')}>
            <ThemedText style={{fontSize:12, textAlign:'right'}}>SEE ALL</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        <TouchableOpacity onPress={() => navigation.navigate('events', {events})} style={{marginTop:15, marginBottom:25}}>
          <Image source={{ uri: 'https://www.nokidhungry.org/sites/default/files/styles/mobile_2x_scale/public/2023-03/homepage_hero_v3.jpg.webp?itok=R0XglCQC' }} style={{width:'100%', height:200, borderTopLeftRadius: 15, borderTopRightRadius: 15}} />
          <ThemedView style={{ padding: 15, borderBottomLeftRadius:15, borderBottomRightRadius:15, backgroundColor:'#FDB917'}}>
            <ThemedText style={{color:'#000', fontWeight:'bold'}}></ThemedText>
            <ThemedView style={{backgroundColor:'#f27622', padding:10, borderRadius:15, marginTop:15, maxWidth:180, justifyContent:'center', alignItems:'center', }}>
              <ThemedText style={{color:'#fff', fontWeight:'bold'}}>Book Tickets</ThemedText>
            </ThemedView>
          </ThemedView>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('podcast')} style={{flex:1, flexDirection:'row', backgroundColor:'rgba(99,200,204, 0.4)', borderRadius:10, paddingTop:25, paddingBottom:25, paddingLeft:15, paddingRight:15}}>
          <ThemedView style={{flex:1, backgroundColor:'transparent'}}>
            <ThemedText style={{fontWeight:'bold'}}>Listen to our Podcast!</ThemedText>
            <ThemedText>Add Passion & Stir</ThemedText>
            <ThemedText style={{borderColor:'#63c8cc', marginTop:10, padding:10, borderWidth:2, textAlign:'center', borderRadius:15}}>Go To Episodes</ThemedText>
          </ThemedView>
          <MaterialCommunityIcons style={{flex:1, textAlign:'right'}} name="podcast" size={50} />
        </TouchableOpacity>

        <ThemedView style={{flex:1, flexDirection:'row'}}>
          <ThemedText style={{flex:1, paddingTop:20, fontSize:12}}>FEATURED FUNDRAISERS</ThemedText>
          <TouchableOpacity style={{flex:1, paddingTop:20}} onPress={() => navigation.navigate('fundraise')}>
            <ThemedText style={{fontSize:12, textAlign:'right'}}>SEE ALL</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        <Carousel
          width={width/1.4}
          height={340}
          style={{flex:1, width: width, overflow:'visible', marginTop:10, backgroundColor:'transparent'}}
          autoPlay={false}
          data={campaigns}
          scrollAnimationDuration={1000}
          renderItem={({ item: campaign }) => (
            <TouchableOpacity onPress={() => navigation.navigate('fundraise', {campaign})} style={{marginRight:25}}>
              <Image source={{ uri: campaign.image }} style={{width:'100%', height:200, borderTopLeftRadius: 15, borderTopRightRadius: 15}} />
              <ThemedView style={{ padding: 15, borderBottomLeftRadius:15, borderBottomRightRadius:15, backgroundColor:'#FDB917'}}>
                <ThemedText style={{color:'#000', fontWeight:'bold'}}>{campaign.title}</ThemedText>
                <ThemedView style={{backgroundColor:'#f27622', padding:10, borderRadius:15, marginTop:15, maxWidth:100, justifyContent:'center', alignItems:'center', }}>
                  <ThemedText style={{color:'#fff', fontWeight:'bold'}}>Create</ThemedText>
                </ThemedView>
              </ThemedView>
            </TouchableOpacity>
          )}
        />

      <ThemedText style={{paddingBottom:10, fontSize:24, lineHeight:30, fontWeight:'bold'}}>Real stories and real impact from your donations.</ThemedText>
        <Carousel
          width={width/1.4}
          height={80}
          style={{flex:1, width: width, overflow:'visible', marginTop:10, backgroundColor:'transparent'}}
          autoPlay={false}
          data={stories}
          scrollAnimationDuration={1000}
          renderItem={({ item: story }) => (
            <TouchableOpacity onPress={() => navigation.navigate('story', {story})} style={{marginRight:25}}>
              <ThemedView>
                <Image source={{ uri: story.image }} style={{width:'100%', height:80, borderRadius: 25}} />
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