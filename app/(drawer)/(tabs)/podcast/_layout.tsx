import { StackScreenWithSearchBar } from '@/constants/Layout'
import { defaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import { View } from 'react-native'

const PodcastScreenLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          ...StackScreenWithSearchBar,
          headerTitle: 'Podcast',
        }}
      />
      <Stack.Screen name="episode" options={{ headerShown: false}} />
    </Stack>
  )
}

export default PodcastScreenLayout