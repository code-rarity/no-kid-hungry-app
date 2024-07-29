import { Tabs, router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Button, Image, StyleSheet, Modal } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { PlatformPayButton, isPlatformPaySupported, confirmPlatformPayPayment } from '@stripe/stripe-react-native';
import { initPaymentSheet, presentPaymentSheet } from "@/providers/stripe/stripeFunctions";
import { createPaymentIntentClientSecret } from "@/scripts/helpers";
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
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

    navigation.push('thankyou', {details: requestBody});
  }

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { position:'absolute' },
        tabBarBackground: () => (
          <BlurView 
            intensity={80} 
            style={{
              ...StyleSheet.absoluteFillObject, 
              overflow:'hidden', 
              backgroundColor:'transparent'
            }}
          />
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Stories',
          headerTitle: '',
          headerStyle: {backgroundColor:'#fff'},
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#000",
          headerLeft: () => <DrawerToggleButton tintColor='#000' />,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'book-open-variant' : 'book-open-variant'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          headerTitle: '',
          headerLeft: () => <DrawerToggleButton tintColor='#fff' />,
          headerStyle: {backgroundColor:'#000'},
          tabBarStyle: {backgroundColor: '#000'},
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#f27622",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'calendar-today' : 'calendar-today'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="blank"
        listeners = {({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            presentPayScreen();
          },
        })}
        options={{
          title: 'Donate',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cart-heart' : 'cart-heart'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="fundraise"
        options={{
          title: 'Fundraise',
          headerTitle: '',
          headerStyle: {backgroundColor:'#fff'},
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#000",
          headerLeft: () => <DrawerToggleButton tintColor='#000' />,
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
          headerLeft: () => <DrawerToggleButton tintColor='#fff' activeTintColor="#e3dd2b" />,
          headerStyle: {backgroundColor:'#1d77ae'},
          tabBarStyle: {backgroundColor: '#1d77ae'},
          tabBarActiveTintColor: "#e3dd2b",
          tabBarInactiveTintColor: "#fff",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'podcast' : 'podcast'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
