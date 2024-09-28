import { Tabs } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { isPlatformPaySupported } from '@stripe/stripe-react-native';
import { initPaymentSheet, presentPaymentSheet } from "@/providers/stripe/stripeFunctions";
import { createPaymentIntentClientSecret } from "@/helpers/services";
import { FloatingPlayer } from "@/components/podcast/FloatingPlayer";
import { useColorScheme } from '@/hooks/useColorScheme';
import CustomTabButton from '@/components/CustomTabButton';
import { BlurView } from 'expo-blur';
import { ThemedView } from '@/components/ThemedView';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout({route}) {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const [isApplePaySupported, setIsApplePaySupported] = useState(false);

  useEffect(() => {
    (async function () {
      setIsApplePaySupported(await isPlatformPaySupported());
    })();
  }, [isPlatformPaySupported]);

  const presentPayScreen = async () => {
    console.log(isApplePaySupported);
    const requestBody = {
      amount: 1000,
      currency: "usd",
    };

    const { customer, clientSecret, error } = await createPaymentIntentClientSecret(
      requestBody
    );

    if (!customer || !clientSecret) {
      console.log("This is the error: " + error);
      return;
    }

    const paymentSheetConfig = {
      applePay: {
        merchantCountryCode: 'US',
        currencyCode: 'USD',
      },
      merchantDisplayName: "Share Our Strength",
      customerId: customer,
      paymentIntentClientSecret: clientSecret,
      allowsDelayedPaymentMethods: false,
      returnURL: 'https://www.nokidhungry.org',
      defaultBillingDetails: {
        name: "Jane Doe",
      },
    };

    const { error: initPaymentSheetError } = await initPaymentSheet(
      paymentSheetConfig
    );

    if (initPaymentSheetError) {
      console.log(initPaymentSheetError);
      return;
    }

    const { error: presentPaymentSheetError } = await presentPaymentSheet();

    if (presentPaymentSheetError) {
      console.log(presentPaymentSheetError);
      return;
    }

    navigation.navigate('other/thankyou', {details: requestBody});
  }

  return (
    <>
      <Tabs
        screenOptions={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderTopWidth: 0,
            borderBottomWidth: 0,
          },
          tabBarStyle: { 
            position:'absolute',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderTopWidth: 0,
            elevation: 0,          
            paddingTop: 0,
          },
          tabBarBackground: () => (
            <BlurView 
              intensity={80} 
              style={{
                ...StyleSheet.absoluteFillObject, 
                overflow:'hidden', 
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
          ),
        }}>
        <Tabs.Screen
          name="(home)"
          options={{
            title: 'Home',
            headerTitle: 'No Kid Hungry',
            headerStyle: {backgroundColor:'#fff'},
            tabBarActiveTintColor: "#f27622",
            tabBarInactiveTintColor: "#000",
            headerLeft: () => <DrawerToggleButton tintColor='#000' />,
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('account/login')} style={{color:"#000", paddingRight:15}}>
                <MaterialCommunityIcons name="account-circle-outline" tintColor='#000' size={25} />
              </TouchableOpacity>
            ),
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home-outline' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="events"
          options={{
            title: 'Events',
            headerTitle: '',
            headerShown: false,
            headerStyle: {backgroundColor:'#fff'},
            tabBarActiveTintColor: "#f27622",
            tabBarInactiveTintColor: "#000",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'calendar-today' : 'calendar-today'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="donate"
          options={{
            title: 'Donate',
            tabBarStyle: {backgroundColor: 'transparent'},
            tabBarButton: (props) => <CustomTabButton bgColor={"#000"} presentPayScreen={presentPayScreen} {...props} />
          }}
        />
        <Tabs.Screen
          name="fundraise"
          options={{
            title: 'Fundraise',
            headerTitle: '',
            headerStyle: {backgroundColor:'#fff'},
            tabBarActiveTintColor: "#f27622",
            tabBarInactiveTintColor: "#000",
            headerLeft: () => <DrawerToggleButton tintColor='#000' />,
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('account/login')} style={{color:"#000", paddingRight:15}}>
                <MaterialCommunityIcons name="account-circle-outline" tintColor='#000' size={25} />
              </TouchableOpacity>
            ),
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'wallet-giftcard' : 'wallet-giftcard'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="podcast"
          options={{
            title: 'Podcast',
            headerTitle: '',
            headerShown: false,
            headerStyle: {
              backgroundColor:'#000',
            },
            tabBarActiveTintColor: "#f27622",
            tabBarInactiveTintColor: "#000",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'podcast' : 'podcast'} color={color} />
            ),
          }}
        />
      </Tabs>

      <FloatingPlayer style={{
        position:'absolute',
        left:8,
        right:8,
        bottom:109,
        backgroundColor:'rgba(242,118,34,0.9)',
      }} />
    </>
  );
}