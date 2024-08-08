import { useEffect, useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { screenPadding } from '@/constants/Layout';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSetupTrackPlayer } from '@/hooks/useSetupTrackPlayer';
import { useLogTrackPlayerState } from '@/hooks/useLogTrackPlayerState';

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
          <Stack>
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
            <Stack.Screen name="player" options={{ presentation: 'card', gestureEnabled:true, gestureDirection:'vertical', animationDuration: 400, headerShown: false}} />
            <Stack.Screen name="thankyou" options={{ headerTitle: '', headerStyle:{backgroundColor:'#64BD44'}}} />
            <Stack.Screen name="settings" options={{ headerTitle: 'Settings'}} />
            <Stack.Screen name="faqs" options={{ headerTitle: 'Faqs'}} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </GestureHandlerRootView>
    </StripeProvider>
  );
}

export default App;