import React, { useLayoutEffect } from 'react';
import { Stack, useNavigation } from 'expo-router';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FundraiseScreenLayout = () => {
  const navigation = useNavigation();

  // This ensures any default navigator styles (like a search bar) are removed.
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
          headerLeft: () => (
            <DrawerToggleButton tintColor={'#000'} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('account')}>
              <MaterialCommunityIcons name="account-circle-outline" color={'#000'} size={28} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  )
}

export default FundraiseScreenLayout;