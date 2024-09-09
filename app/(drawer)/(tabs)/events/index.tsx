import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Image, Platform, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { EventList } from '@/components/events/EventList';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigationSearch } from '@/hooks/useNavigationSearch';
import { screenPadding } from '@/constants/Layout';
import { eventTitleFilter } from '@/helpers/filters';
import { parseDateString } from '@/helpers/misc';
import LoaderKit from 'react-native-loader-kit';
import Carousel from 'react-native-reanimated-carousel';

export default function EventsScreen() {
  const width = Dimensions.get('window').width;
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchEvents();
  }, []);

  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder:'Find an event',
      textColor: "#000",
    }
  });

  const filteredEvents = useMemo(() => {
    if(!search) return events;

    return events.filter(eventTitleFilter(search));
  }, [search, events]);

  const fetchEvents = async () => {
    try {
      await fetch(`https://events.nokidhungry.org/wp-json/wp/v2/events?filter[orderby]=event_date&order=desc&per_page=10&offset=${offset}`)
      .then(rep => rep.json())
      .then(res => {
        res.map((event, i) => {
          if(event.event_date) {
            // Date formatting and isolation
            const date = parseDateString(event.event_date);

            const event_day = date.getDate();
            const event_month = date.toLocaleString('default', { month: 'short' });
            const event_year = date.getFullYear();

            if(i < 5) {
              setFeaturedEvents(prevFeaturedEvents => [
                ...prevFeaturedEvents,
                {
                  title: event.title.rendered,
                  event_date: event.event_date,
                  event_day: event_day,
                  event_month: event_month,
                  event_year: event_year,
                  event_type: event.event_type_name,
                  link: event.link,
                  image: event.image_paths["culinary-square"],
                  address: event.location.address,
                  desc: event.yoast_head_json.description,
                }
              ]);
            } else {
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
                  image: event.image_paths["culinary-square"],
                  address: event.location.address,
                  desc: event.yoast_head_json.description,
                }
              ]);
            }
          }
        });
        //setPage(prevPage => prevPage + 1);
        setOffset(prevOffset => prevOffset + 10);
      });
    } catch (error) {
      console.error(error);
    }    
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}>
        <ThemedText style={{color:'#000', fontWeight:'bold', paddingLeft:5, paddingBottom:20}}>FEATURED</ThemedText>
        <Carousel
            width={width*0.72}
            height={320}
            style={{ width: width }}
            autoPlay={false}
            data={featuredEvents}
            scrollAnimationDuration={1000}
            //onSnapToItem={(index) => console.log('current index:', index)}
            renderItem={({ item: event }) => (
              <TouchableOpacity style={{flex:1}}>
                <Image source={{ uri: event.image }} style={{width:width/1.5, height:width/1.5, borderRadius: 25}} />
                <ThemedView style={{position:'absolute', width:60, left:(width/1.5 - 80), top:10, padding:5, borderRadius:20, backgroundColor:'#000'}}>
                  <ThemedText style={{textAlign:'center'}}>{event.event_month}</ThemedText>
                  <ThemedText style={{textAlign:'center', fontWeight:'bold', fontSize:22}}>{event.event_day}</ThemedText>
                </ThemedView>
                <ThemedView style={{position:'absolute', left:10, bottom:30, padding:20, color:'#f27622', fontWeight:'bold', backgroundColor:'transparent'}}>
                  <ThemedText>{event.title}</ThemedText>
                </ThemedView>
              </TouchableOpacity>
            )}
        />
        <ThemedText style={{color:'#000', fontWeight:'bold', paddingLeft:5, paddingBottom:20}}>ALL EVENTS</ThemedText>
        <EventList scrollEnabled={false} events={filteredEvents} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  emptyContainer: {
    flex:1,
    height: Dimensions.get('window').height,
    backgroundColor:"#fff",
    alignItems: 'center',
  },
  emptyContainerText: {
    backgroundColor:"#fff",
    fontSize: 24,
    fontWeight:'bold',
    color:"#fff",
    textAlign:'center',
  },
  eventsLoadingIconIndicator: {
    fontWeight:'bold',
    marginTop:180,
    marginBottom:40,
    width:180,
    height:180,
  },
})