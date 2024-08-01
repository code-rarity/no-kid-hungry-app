import { StackScreenWithSearchBar } from '@/constants/Layout'
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Stack } from 'expo-router'

const PodcastScreenLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          ...StackScreenWithSearchBar,
          headerTitle: 'Add Passion & Stir',
          headerLeft: () => <DrawerToggleButton tintColor='#000' activeTintColor="#e3dd2b" />,
        }}
      />
      <Stack.Screen name="episode" options={{headerShown: false}} />
    </Stack>
  )
}

export default PodcastScreenLayout