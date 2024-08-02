import { StackScreenWithSearchBar } from '@/constants/Layout'
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Stack } from 'expo-router'
import { ThemedView } from '@/components/ThemedView';

const PodcastScreenLayout = () => {
  return (
    <ThemedView style={{flex:1}}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            ...StackScreenWithSearchBar,
            headerTitle: 'Add Passion & Stir',
            headerLargeStyle: {
              backgroundColor: '#000',
            },
            headerLargeTitleStyle: {
              color: '#fff',
            },
            headerTintColor: '#fff',
            headerLeft: () => ( <DrawerToggleButton tintColor='#fff' activeTintColor="#e3dd2b" /> ),
          }}
        />
        <Stack.Screen name="episode" options={{headerShown: false}} />
      </Stack>
    </ThemedView>
  )
}

export default PodcastScreenLayout