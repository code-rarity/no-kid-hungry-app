import { StackScreenWithSearchBar } from '@/constants/Layout'
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Stack } from 'expo-router'
import { ThemedView } from '@/components/ThemedView';

const PodcastScreenLayout = () => {
  return (
    <ThemedView style={{flex:1}}>
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
            headerLargeTitleStyle: {
              color: '#000',
            },
            headerTintColor: '#000',
            headerLeft: () => 
              <ThemedView style={{marginLeft:-20, marginRight:20, backgroundColor:'transparent'}}>
                <DrawerToggleButton tintColor='#000' />
              </ThemedView>,
          }}
        />
      </Stack>
    </ThemedView>
  )
};

export default PodcastScreenLayout;