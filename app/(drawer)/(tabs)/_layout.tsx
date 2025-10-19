import { Tabs, useNavigation } from 'expo-router';
import React, { useState, useEffect, createContext } from 'react';
import { TouchableOpacity, View } from "react-native";
import { DrawerToggleButton } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { FloatingPlayer } from "@/components/podcast/FloatingPlayer";
import ThankYouModal from '@/components/modals/ThankYouModal';
import CustomTabBar from '@/components/navigation/CustomTabBar';
import DonationModal from '@/components/modals/DonationModal';

// Create a context to share the modal toggle function
export const DonationModalContext = createContext(null);

export default function TabLayout() {
  const navigation = useNavigation();
  const [thankYouVisible, setThankYouVisible] = useState(false);
  const [donationModalVisible, setDonationModalVisible] = useState(false);

  const toggleThankYouModal = () => {
    setThankYouVisible(!thankYouVisible);
  };

  const toggleDonationModal = () => {
    setDonationModalVisible(!donationModalVisible);
  };

  return (
    <DonationModalContext.Provider value={toggleDonationModal}>
      <View style={{ flex: 1 }}>
        <Tabs
          tabBar={(props) => <CustomTabBar {...props} />}
          screenOptions={{
            headerShown: false, 
          }}
        >
          <Tabs.Screen
            name="(home)"
            options={{
              headerShown: true,
              // Apply the same solid white header style as the Events screen
              headerStyle: { backgroundColor: '#fff' },
              headerShadowVisible: false,
              headerTitle: '',
              // Apply the same container styles for consistent padding
              headerLeftContainerStyle: {
                paddingLeft: 20,
              },
              headerRightContainerStyle: {
                paddingRight: 20,
              },
              headerLeft: () => (
                <DrawerToggleButton tintColor={'#000'} />
              ),
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('account')}>
                  <MaterialCommunityIcons 
                    name="account-circle-outline" 
                    size={28} 
                    color={'#000'} 
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Tabs.Screen name="events" options={{ title: 'Events' }} />
          <Tabs.Screen
            name="donate"
            options={{ title: 'Donate' }}
            listeners={{
              tabPress: (e) => {
                e.preventDefault();
                toggleDonationModal();
              },
            }}
          />
          <Tabs.Screen name="fundraise" options={{ title: 'Fundraise' }} />
          <Tabs.Screen name="podcast" options={{ title: 'Podcast' }} />
        </Tabs>

        <FloatingPlayer style={{
          position:'absolute',
          left:8,
          right:8,
          bottom: 100, 
          backgroundColor:'rgba(242,118,34,0.9)',
        }} />

        {donationModalVisible && <DonationModal visible={donationModalVisible} onClose={toggleDonationModal} />}
        <ThankYouModal visible={thankYouVisible} onClose={toggleThankYouModal} />
      </View>
    </DonationModalContext.Provider>
  );
}
