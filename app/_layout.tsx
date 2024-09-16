import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack, router } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useFonts } from 'expo-font';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSetupTrackPlayer } from '@/hooks/useSetupTrackPlayer';
import { useLogTrackPlayerState } from '@/hooks/useLogTrackPlayerState';
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from '@/components/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const App = () => {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    GothamBlack: require('../assets/fonts/Gotham-Black.ttf'),
  });

  const handleTrackPlayerLoaded = useSetupTrackPlayer({
    onLoad: handleTrackPlayerLoaded,
  })

  useLogTrackPlayerState();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <StripeProvider publishableKey="pk_test_sCOFwBgBiNBBtMFnCogmpkp900QgzWio5i" merchantIdentifier="merchant.com.shareourstrength">
      <GestureHandlerRootView style={{flex: 1}}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{headerStyle: {elevation: 0, shadowOpacity: 0, borderBottomWidth: 0}}}>
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
            <Stack.Screen name="player" options={{ presentation: 'card', gestureEnabled:true, gestureDirection:'vertical', animationDuration: 400, headerShown: false}} />
            <Stack.Screen name="settings" options={{ headerTitle: 'Settings'}} />
            <Stack.Screen name="faqs" options={{ headerTitle: 'Faqs'}} />
            <Stack.Screen name="thankyou" options={{ headerTitle: '', headerStyle:{backgroundColor:'#64BD44'}}} />
            <Stack.Screen name="+not-found" />

            <Stack.Screen name="login" options={{ headerTitle: '', headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()} style={{flexDirection:'row'}}>
                <MaterialCommunityIcons name="arrow-left-bold-outline" size={25} />
                <ThemedText style={{paddingLeft:10}}>Back</ThemedText>
              </TouchableOpacity> )
            }} />

          </Stack>
        </ThemeProvider>
      </GestureHandlerRootView>
    </StripeProvider>
  );
}

export default App;