import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, ScrollView, TouchableOpacity, Text, FlatList, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// --- Reusable Components (mirrored from Events screen for consistency) ---

const CategoryPill = ({ title, icon, active }) => (
    <TouchableOpacity style={[styles.pill, active && styles.pillActive]}>
        {icon && <MaterialCommunityIcons name={icon} size={20} color={active ? '#fff' : '#333'} style={{ marginRight: 8 }} />}
        <Text style={[styles.pillText, active && styles.pillTextActive]}>{title}</Text>
    </TouchableOpacity>
);

const FeaturedFundraiserCard = ({ campaign }) => (
    <View style={styles.featuredCard}>
        <Image source={{ uri: campaign.image }} style={styles.featuredImage} />
        <View style={styles.featuredInfoBox}>
            <Text style={styles.featuredInfoText} numberOfLines={2}>{campaign.title}</Text>
            <TouchableOpacity style={styles.donateNowButton}>
                <Text style={styles.donateNowText}>Start a Fundraiser</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const OngoingFundraiserCard = ({ campaign }) => (
    <TouchableOpacity style={styles.ongoingCard}>
        <Image source={{ uri: campaign.image }} style={styles.ongoingImage} />
        <View style={styles.ongoingContent}>
            <Text style={styles.ongoingTitle} numberOfLines={2}>{campaign.title}</Text>
        </View>
    </TouchableOpacity>
);


export default function FundraiseScreen() {
  const [featuredCampaign, setFeaturedCampaign] = useState(null);
  const [ongoingCampaigns, setOngoingCampaigns] = useState([]);
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState('Bake Sale');

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      // Fetch all campaign posts
      const campaignsResponse = await fetch(`https://fundraise.nokidhungry.org/wp-json/wp/v2/campaign`);
      const campaignsData = await campaignsResponse.json();

      // Get all media IDs
      const mediaIds = campaignsData.map(c => c.featured_media).filter(id => id > 0);
      
      // Fetch all media items in parallel
      const mediaResponse = await fetch(`https://fundraise.nokidhungry.org/wp-json/wp/v2/media?include=${mediaIds.join(',')}`);
      const mediaData = await mediaResponse.json();
      
      // Create a map for easy lookup of image URLs
      const mediaMap = mediaData.reduce((acc, media) => {
        acc[media.id] = media.source_url;
        return acc;
      }, {});

      // Combine campaigns with their image URLs
      const formattedCampaigns = campaignsData.map(campaign => ({
        id: campaign.id,
        title: campaign.title.rendered,
        image: mediaMap[campaign.featured_media] || 'https://placehold.co/600x400/eee/333?text=No+Image', // Fallback image
        link: campaign.link,
      }));

      if (formattedCampaigns.length > 0) {
          setFeaturedCampaign(formattedCampaigns[0]);
          setOngoingCampaigns(formattedCampaigns.slice(1));
      }

    } catch (error) {
      console.error(error);
    }    
  }

  return (
    <ScrollView
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ 
        paddingBottom: insets.bottom + 100,
      }}>
      
      {/* --- Top Segment --- */}
      <View style={styles.topSegment}>
          <View style={styles.searchContainer}>
              <MaterialCommunityIcons name="magnify" size={24} color="#888" />
              <TextInput style={styles.searchInput} placeholder="Find a fundraiser" />
          </View>
          <View>
              <Text style={styles.subHeaderTitle}>Create a Fundraiser</Text>
              <Text style={styles.subHeaderText}>Your fundraiser helps feed kids</Text>
          </View>
      </View>

      {/* --- Main Content Segment --- */}
      <View style={styles.mainSegment}>
          {/* Category Pills */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillsContainer}>
              <CategoryPill title="Bake Sale" icon="muffin" active={activeCategory === 'Bake Sale'} />
              <CategoryPill title="Streaming" icon="gamepad-variant" active={activeCategory === 'Streaming'} />
              <CategoryPill title="Birthdays" icon="cake-variant" active={activeCategory === 'Birthdays'} />
          </ScrollView>

          {/* Featured Event */}
          {featuredCampaign && <FeaturedFundraiserCard campaign={featuredCampaign} />}

          {/* Ongoing Events Section */}
          <View style={styles.ongoingHeader}>
              <Text style={styles.ongoingSectionTitle}>Ongoing Fundraisers</Text>
              <TouchableOpacity>
                  <Text style={styles.seeAllText}>See all <MaterialCommunityIcons name="arrow-right" size={14} /></Text>
              </TouchableOpacity>
          </View>
          <FlatList
              horizontal
              data={ongoingCampaigns}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <OngoingFundraiserCard campaign={item} />}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={{ paddingLeft: 20 }}
          />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
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
        borderRadius: 25,
        paddingVertical: 20,
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
        position: 'relative',
    },
    featuredImage: {
        width: '100%',
        height: 250,
        borderRadius: 20,
    },
    featuredInfoBox: {
        position: 'absolute',
        bottom: -20,
        left: 15,
        right: 15,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    featuredInfoText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
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
    ongoingTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 4,
    },
});
