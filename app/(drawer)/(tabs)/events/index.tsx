import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, ScrollView, TouchableOpacity, Text, FlatList, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { parseDateString } from '@/helpers/misc';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from 'expo-router';
import { DrawerToggleButton } from '@react-navigation/drawer';

// --- Reusable Components for the new design ---

// Pill-shaped category button
const CategoryPill = ({ title, icon, active }) => (
    <TouchableOpacity style={[styles.pill, active && styles.pillActive]}>
        {icon && <MaterialCommunityIcons name={icon} size={20} color={active ? '#fff' : '#333'} style={{ marginRight: 8 }} />}
        <Text style={[styles.pillText, active && styles.pillTextActive]}>{title}</Text>
    </TouchableOpacity>
);

// Large card for the featured event with updated overlay style
const FeaturedEventCard = ({ event }) => (
    <View style={styles.featuredCard}>
        <Image source={{ uri: event.image }} style={styles.featuredImage} />
        {/* This is now a floating card instead of a full-width overlay */}
        <View style={styles.featuredInfoBox}>
            <View style={styles.featuredOverlayContent}>
                <Text style={styles.featuredDonationText}>Recently donated: 55 People</Text>
                <Text style={styles.featuredUrgentText}>Urgent</Text>
            </View>
            <TouchableOpacity style={styles.donateNowButton}>
                <Text style={styles.donateNowText}>Donate Now</Text>
            </TouchableOpacity>
        </View>
    </View>
);

// Smaller card for the horizontal carousel (now larger)
const OngoingEventCard = ({ event }) => (
    <TouchableOpacity style={styles.ongoingCard}>
        <Image source={{ uri: event.image }} style={styles.ongoingImage} />
        <View style={styles.ongoingContent}>
            <Text style={styles.ongoingEventType}>{event.event_type}</Text>
            <Text style={styles.ongoingTitle} numberOfLines={2}>{event.title}</Text>
        </View>
    </TouchableOpacity>
);


export default function EventsScreen() {
  const [featuredEvent, setFeaturedEvent] = useState(null);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState('Taste of the Nation');
  const navigation = useNavigation();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`https://events.nokidhungry.org/wp-json/wp/v2/events?filter[orderby]=event_date&order=desc&per_page=10`);
      const res = await response.json();
      
      const formattedEvents = res
        .filter(event => event.event_date)
        .map(event => ({
            id: event.id,
            title: event.title.rendered,
            event_type: event.event_type_name,
            image: event.image_paths["culinary-square"],
        }));

      if (formattedEvents.length > 0) {
          setFeaturedEvent(formattedEvents[0]); // First event is featured
          setOngoingEvents(formattedEvents.slice(1)); // The rest are ongoing
      }

    } catch (error) {
      console.error(error);
    }    
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ backgroundColor: '#121212'}} // Add dark background to scrollview
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ 
          paddingBottom: insets.bottom + 100,
        }}>
        
        {/* --- Top Segment --- */}
        <View style={styles.topSegment}>
            {/* Search Bar is added back here */}
            <View style={styles.searchContainer}>
                <MaterialCommunityIcons name="magnify" size={24} color="#888" />
                <TextInput style={styles.searchInput} placeholder="Find an event" />
            </View>
            <View>
                <Text style={styles.subHeaderTitle}>Choose an event</Text>
                <Text style={styles.subHeaderText}>These Events Help Feed Kids</Text>
            </View>
        </View>

        {/* --- Main Content Segment --- */}
        <View style={styles.mainSegment}>
            {/* Category Pills */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillsContainer}>
                <CategoryPill title="Taste of the Nation" icon="food-variant" active={activeCategory === 'Taste of the Nation'} />
                <CategoryPill title="NKH Dinners" icon="food-dining" active={activeCategory === 'NKH Dinners'} />
                <CategoryPill title="Chefs Cycle" icon="bike" active={activeCategory === 'Chefs Cycle'} />
            </ScrollView>

            {/* Featured Event */}
            {featuredEvent && <FeaturedEventCard event={featuredEvent} />}

            {/* Ongoing Events Section */}
            <View style={styles.ongoingHeader}>
                <Text style={styles.ongoingSectionTitle}>Ongoing Hunger Crises</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAllText}>See all <MaterialCommunityIcons name="arrow-right" size={14} /></Text>
                </TouchableOpacity>
            </View>
            <FlatList
                horizontal
                data={ongoingEvents}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <OngoingEventCard event={item} />}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{ paddingLeft: 20 }}
            />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Main container is white
  },
  topSegment: {
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingVertical: 20, 
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
  },
  searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      paddingHorizontal: 15,
      marginBottom: 20,
  },
  searchInput: {
      flex: 1,
      paddingVertical: 12,
      marginLeft: 10,
      fontSize: 16,
  },
  subHeaderTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 4,
  },
  subHeaderText: {
      fontSize: 14,
      color: '#888',
  },
  mainSegment: {
      marginTop: 2,
      backgroundColor: '#fff',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      paddingTop: 20,
      paddingBottom: 20,
  },
  pillsContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 20,
  },
  pill: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 20,
      marginRight: 10,
  },
  pillActive: {
      backgroundColor: '#28a745',
  },
  pillText: {
      fontWeight: 'bold',
      color: '#333',
  },
  pillTextActive: {
      color: '#fff',
  },
  featuredCard: {
      marginHorizontal: 20,
      position: 'relative', // Needed for absolute positioning of the info box
  },
  featuredImage: {
      width: '100%',
      height: 250,
      borderRadius: 20,
  },
  featuredInfoBox: {
      position: 'absolute',
      bottom: -20, // Position it to hang off the bottom of the image
      left: 15,
      right: 15,
      backgroundColor: '#fff',
      borderRadius: 15,
      padding: 15,
      // Shadow for the floating effect
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
  },
  featuredOverlayContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
  },
  featuredDonationText: {
      fontWeight: 'bold',
  },
  featuredUrgentText: {
      color: 'red',
      fontWeight: 'bold',
  },
  donateNowButton: {
      backgroundColor: '#333',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
  },
  donateNowText: {
      color: '#fff',
      fontWeight: 'bold',
  },
  ongoingHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginTop: 40, // Increased margin to avoid overlap with featured card shadow
      marginBottom: 15,
  },
  ongoingSectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
  },
  seeAllText: {
      color: '#007AFF',
      fontWeight: 'bold',
  },
  ongoingCard: {
      width: 220, // Larger card width
      marginRight: 15,
  },
  ongoingImage: {
      width: '100%',
      height: 120, // Larger image height
      borderRadius: 15,
  },
  ongoingContent: {
      marginTop: 8,
  },
  ongoingEventType: {
      fontSize: 12,
      color: '#888',
      textTransform: 'uppercase',
  },
  ongoingTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 4,
  },
});

