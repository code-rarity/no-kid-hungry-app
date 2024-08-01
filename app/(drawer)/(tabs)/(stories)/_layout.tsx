import { StackScreenWithSearchBar } from '@/constants/Layout'
import { defaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import { View } from 'react-native'

const StoriesScreenLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          //...StackScreenWithSearchBar,
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="story" 
        options={{ 
          headerTitle: ''
        }} 
      />
    </Stack>
  )
}

export default StoriesScreenLayout