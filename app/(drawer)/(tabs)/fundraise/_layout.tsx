import { StackScreenWithSearchBar } from '@/constants/Layout'
import { defaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import { View } from 'react-native'

const FundraiseScreenLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          //...StackScreenWithSearchBar,
          headerShown: false,
        }}
      />
    </Stack>
  )
}

export default FundraiseScreenLayout