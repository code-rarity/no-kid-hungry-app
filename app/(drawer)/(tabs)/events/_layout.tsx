import { TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { StackScreenWithSearchBar } from '@/constants/Layout';
import { ThemedView } from '@/components/ThemedView';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const EventsScreenLayout = () => {
  return (
    <ThemedView style={{flex:1, backgroundColor: '#000'}}>
      <Stack screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        }
      }}>
        <Stack.Screen
          name="index"
          options={{
            ...StackScreenWithSearchBar,
            headerTitle: 'Explore Events',
            headerShown:true,
            headerStyle: {
              backgroundColor: '#000', // Change header background to black
            },
            headerLargeStyle: {
              backgroundColor: '#000', // Specifically for the large header area
            },
            headerLargeTitleStyle: {
              color: '#fff', // Change header title text to white
            },
            headerTintColor: '#fff', // Change header tint color for other elements
            headerLeft: () => 
              <ThemedView style={{marginLeft:-20, marginRight:20, backgroundColor:'transparent'}}>
                <DrawerToggleButton tintColor='#fff' />
              </ThemedView>,
            headerRight: () => (
              <TouchableOpacity onPress={() => router.navigate('account')} style={{marginRight:-5}}>
                <MaterialCommunityIcons name="account-circle-outline" color='#fff' size={25} />
              </TouchableOpacity>
            ),
            }}
        />
        <Stack.Screen name="event" options={{ headerShown: false }} />
      </Stack>
    </ThemedView>
  )
}

export default EventsScreenLayout

