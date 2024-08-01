import React from 'react';
import { StyleSheet } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { router } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem 
        icon={({color, size}) => (
          <MaterialCommunityIcons name="lightbulb" size={25} />
        )} 
        label={"FAQs"}
        labelStyle={styles.navItemLabel}
        onPress={() => {
          router.push('/(drawer)/(tabs)/faqs');
        }}
      />
      <DrawerItem 
        icon={({color, size}) => (
          <MaterialCommunityIcons name="cog" size={25} />
        )} 
        label={"Settings"}
        labelStyle={styles.navItemLabel}
        onPress={() => {
          router.push('/(drawer)/(tabs)/settings');
        }}
      />
    </DrawerContentScrollView>
  );
}

export default function Layout() {
  const colorScheme = useColorScheme();

  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{ headerShown: false }} />
  )
}

const styles = StyleSheet.create({
  navItemLabel: {
    marginLeft:-20,
    fontSize: 18,
  }
})