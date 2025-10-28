import React, { useLayoutEffect } from 'react';
import { Stack, useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const EventsScreenLayout = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: undefined,
    });
  }, [navigation]);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: '#fff' },
          headerShadowVisible: false,
          headerTitle: '',
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
          headerRightContainerStyle: {
            paddingRight: 20,
          },
          // Replace the default button with a custom one for consistent styling
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
              <MaterialCommunityIcons name="menu" color={'#000'} size={28} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('account')}>
              <MaterialCommunityIcons name="account-circle-outline" color={'#000'} size={28} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="event" options={{ headerShown: false }} />
    </Stack>
  )
}

export default EventsScreenLayout;

