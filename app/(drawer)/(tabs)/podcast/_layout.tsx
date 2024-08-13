import { StackScreenWithSearchBar } from '@/constants/Layout'
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Stack } from 'expo-router'
import { ThemedView } from '@/components/ThemedView';

const PodcastScreenLayout = () => {
  return (
    <ThemedView style={{flex:1, backgroundColor:'#000'}}>
      <Stack screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        safeAreaInsets: { left: 0, right: 0 }
      }}>
        <Stack.Screen
          name="index"
          options={{
            ...StackScreenWithSearchBar,
            headerTitle: 'Add Passion & Stir',
            /*headerLargeStyle: {
              backgroundColor: '#000',
            },*/
            headerLargeTitleStyle: {
              color: '#fff',
            },
            headerTintColor: '#fff',
            headerLeft: () => 
              <ThemedView style={{marginLeft:-16, marginRight:16, backgroundColor:'transparent'}}>
                <DrawerToggleButton tintColor='#fff' />
              </ThemedView>,
          }}
        />
      </Stack>
    </ThemedView>
  )
};

export default PodcastScreenLayout;