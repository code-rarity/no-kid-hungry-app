import { useEffect, useCallback } from 'react';
import { Stack } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StripeProvider } from '@stripe/stripe-react-native';

import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

import { useFonts } from 'expo-font';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSetupTrackPlayer } from '@/hooks/useSetupTrackPlayer';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const App = () => {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    GothamBlack: require('../assets/fonts/Gotham-Black.ttf'),
  });

  const handleTrackPlayerLoaded = 'something';//useSetupTrackPlayer();

  useEffect(() => {
    if (fontsLoaded && handleTrackPlayerLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, handleTrackPlayerLoaded]);

  if (!fontsLoaded || !handleTrackPlayerLoaded) {
    return null;
  }

  return (
    <StripeProvider publishableKey="pk_test_sCOFwBgBiNBBtMFnCogmpkp900QgzWio5i" merchantIdentifier="merchant.com.shareourstrength">
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="thankyou" options={{ headerTitle: '', headerStyle:{backgroundColor:'#64BD44'}}} />
          <Stack.Screen name="settings" options={{ headerTitle: 'Settings'}} />
          <Stack.Screen name="faqs" options={{ headerTitle: 'Faqs'}} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </StripeProvider>
  );
}

export default App;