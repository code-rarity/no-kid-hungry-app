import { TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { StackScreenWithSearchBar } from '@/constants/Layout';
import { ThemedView } from '@/components/ThemedView';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const EventsScreenLayout = () => {
  return (
    <ThemedView style={{flex:1}}>
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
            headerLargeStyle: {
              backgroundColor: '#fff',
            },
            headerLargeTitleStyle: {
              color: '#000',
            },
            headerTintColor: '#000',
            headerLeft: () => 
              <ThemedView style={{marginLeft:-20, marginRight:20, backgroundColor:'transparent'}}>
                <DrawerToggleButton tintColor='#000' />
              </ThemedView>,
            headerRight: () => (
              <TouchableOpacity onPress={() => router.navigate('account')} style={{color:"#000", marginRight:-5}}>
                <MaterialCommunityIcons name="account-circle-outline" tintColor='#000' size={25} />
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