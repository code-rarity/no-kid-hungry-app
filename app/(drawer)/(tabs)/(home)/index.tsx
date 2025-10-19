import React, { useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StatusBar } from 'expo-status-bar';
import { DonationModalContext } from '../_layout'; // Import the context

// Mock data for the fundraiser card
const fundraiser = {
  title: 'Together We Can: Fundraiser Gala',
  raised: '$15,435',
  daysLeft: 12,
  image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2940&auto=format&fit=crop',
};

// Category component, styled to match reference
const Category = ({ icon, name }) => (
  <TouchableOpacity style={styles.category}>
    <View style={styles.categoryIconContainer}>
      <MaterialCommunityIcons name={icon} size={24} color="#333" />
    </View>
    <Text style={styles.categoryText}>{name}</Text>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const toggleDonationModal = useContext(DonationModalContext);

  return (
    <ScrollView
      style={styles.container}
      // This property tells the ScrollView to automatically avoid the header
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ 
        paddingBottom: insets.bottom + 100,
      }}
    >
      {/* Set status bar icons to dark to be visible on the white background */}
      <StatusBar style="dark" />
      
      {/* Top Segment */}
      <View style={styles.topSegment}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.welcomeText}>Welcome back!</Text>
            <Text style={styles.userName}>Jaydon Dias</Text>
          </View>
          <TouchableOpacity 
            style={styles.topUpButton}
            onPress={toggleDonationModal}
          >
            <Text style={styles.topUpText}>Top Up</Text>
            <MaterialCommunityIcons name="plus" size={16} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.pointsContainer}>
          <View style={styles.pointsIcon}>
            <MaterialCommunityIcons name="trophy-outline" size={32} color="#333" />
          </View>
          <View style={styles.pointsTextContainer}>
            <Text style={styles.pointsTitle}>Donation point</Text>
            <Text style={styles.pointsValue}>1800<Text style={styles.pointsUnit}>Pts</Text></Text>
            <Text style={styles.pointsSubtitle}>200 point till your next reward</Text>
          </View>
        </View>
      </View>

      {/* Categories Segment */}
      <View style={styles.segment}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesContainer}>
          <Category icon="book-open-page-variant-outline" name="Education" />
          <Category icon="heart-outline" name="Medical" />
          <Category icon="home-group" name="Nonprofit" />
          <Category icon="account-group-outline" name="Community" />
        </View>
      </View>

      {/* Discover Events Segment */}
      <View style={styles.segment}>
        <Text style={styles.sectionTitle}>Discover Events</Text>
        <View style={styles.discoverCard}>
          <Image source={{ uri: fundraiser.image }} style={styles.discoverImage} />
          <TouchableOpacity style={styles.heartIcon}>
            <MaterialCommunityIcons name="heart-outline" size={24} color="#333" />
          </TouchableOpacity>
          <View style={styles.discoverContent}>
            <Text style={styles.discoverUser}>Insan Pribadi</Text>
            <Text style={styles.discoverTitle}>{fundraiser.title}</Text>
            <View style={styles.discoverFooter}>
              <Text style={styles.daysLeft}>{fundraiser.daysLeft} days left</Text>
              <Text style={styles.discoverRaised}>{fundraiser.raised}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background for the scrollable area
  },
  topSegment: {
      backgroundColor: '#fff',
      // The top corners are no longer rounded
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      padding: 20, 
      marginBottom: 2,
  },
  segment: {
    backgroundColor: '#fff',
    borderRadius: 25, 
    padding: 20, 
    marginBottom: 2,
    marginHorizontal: 4, // Add horizontal margin to create space
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#888',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  pointsTextContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  pointsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  pointsValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
  },
  pointsUnit: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#555',
  },
  pointsSubtitle: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 25,
  },
  topUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  topUpText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  category: {
    alignItems: 'center',
  },
  categoryIconContainer: {
    backgroundColor: '#f0f2f5',
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
  discoverCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  discoverImage: {
    width: '100%',
    height: 180,
  },
  heartIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: 20,
  },
  discoverContent: {
    paddingTop: 15,
  },
  discoverUser: {
    fontSize: 14,
    color: '#888',
  },
  discoverTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 2,
  },
  discoverFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  daysLeft: {
    fontSize: 14,
    color: '#888',
  },
  discoverRaised: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

