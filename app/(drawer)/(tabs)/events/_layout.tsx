import { StackScreenWithSearchBar } from '@/constants/Layout';
import { Stack } from 'expo-router';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { ThemedView } from '@/components/ThemedView';

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
            headerLargeStyle: {
              backgroundColor: '#000',
            },
            headerLargeTitleStyle: {
              color: '#fff',
            },
            headerTintColor: '#fff',
            headerLeft: () => 
              <ThemedView style={{marginLeft:-16, marginRight:16, backgroundColor:'transparent'}}>
                <DrawerToggleButton tintColor='#fff' />
              </ThemedView>,          }}
        />
        <Stack.Screen name="event" options={{ headerShown: false }} />
      </Stack>
    </ThemedView>
  )
}

export default EventsScreenLayout