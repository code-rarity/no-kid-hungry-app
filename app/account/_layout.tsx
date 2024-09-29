import { Stack, router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AccountScreenLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: '', headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()} style={{flexDirection:'row'}}>
          <MaterialCommunityIcons name="chevron-left" size={32} />
          <ThemedText style={{marginTop:4}}>Back</ThemedText>
        </TouchableOpacity> )
      }} />
    </Stack>
  )
}

export default AccountScreenLayout;