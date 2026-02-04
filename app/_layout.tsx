import { Hub } from 'aws-amplify/utils';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useFonts } from 'expo-font';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSetupTrackPlayer } from '@/hooks/useSetupTrackPlayer';
import { useLogTrackPlayerState } from '@/hooks/useLogTrackPlayerState';
import * as SplashScreen from 'expo-splash-screen';
import { fetchOrCreateLuminateUser, logOutLuminateUser } from '@/model/userAPI';
import { Authenticator } from "@aws-amplify/ui-react-native";
import 'react-native-reanimated';
// Import the SafeAreaProvider
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const App = () => {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    GothamBlack: require('../assets/fonts/Gotham-Black.ttf'),
  });

  const handleTrackPlayerLoaded = useSetupTrackPlayer({
    onLoad: () => {},
  });
  useLogTrackPlayerState();

  useEffect(() => {
    const hubListener = Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signedIn':
          fetchOrCreateLuminateUser(payload);
          break;
        case 'signedOut':
          logOutLuminateUser();
          break;
      }
    });

    // Cleanup the listener when the component unmounts
    return () => {
      hubListener();
    };
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    // Wrap the entire app with SafeAreaProvider
    <SafeAreaProvider>
      <Authenticator.Provider>
        <StripeProvider 
          publishableKey="pk_test_sCOFwBgBiNBBtMFnCogmpkp900QgzWio5i" 
          merchantIdentifier="merchant.com.shareourstrength"
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack>
                <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
                <Stack.Screen name="other" options={{ headerShown: false }} />
                <Stack.Screen name="account" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
            </ThemeProvider>
          </GestureHandlerRootView>
        </StripeProvider>
      </Authenticator.Provider>
    </SafeAreaProvider>
  );
}

export default App;
