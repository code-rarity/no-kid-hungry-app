import { Stack, router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const OtherScreenLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="settings" options={{ 
        headerTitle: 'Settings',
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} style={{flexDirection:'row'}}>
            <MaterialCommunityIcons name="chevron-left" size={32} color={"black"} />
            <ThemedText style={{marginTop:4, color:'#000'}}>Back</ThemedText>
          </TouchableOpacity> )
      }} />
      <Stack.Screen name="faqs" options={{ 
        headerTitle: 'FAQs',
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} style={{flexDirection:'row'}}>
            <MaterialCommunityIcons name="chevron-left" size={32} color={"black"} />
            <ThemedText style={{marginTop:4, color:'#000'}}>Back</ThemedText>
          </TouchableOpacity> )
      }} />
    </Stack>
  )
}

export default OtherScreenLayout;