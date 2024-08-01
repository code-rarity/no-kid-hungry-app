import { StackScreenWithSearchBar } from '@/constants/Layout'
import { defaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import { View } from 'react-native'

const EventsScreenLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          //...StackScreenWithSearchBar,
          headerShown: false,
        }}
      />
      <Stack.Screen name="event" options={{ headerShown: false}} />
    </Stack>
  )
}

export default EventsScreenLayout