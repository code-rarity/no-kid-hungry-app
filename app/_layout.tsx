import { Hub } from 'aws-amplify/utils';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack, router } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useFonts } from 'expo-font';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSetupTrackPlayer } from '@/hooks/useSetupTrackPlayer';
import { useLogTrackPlayerState } from '@/hooks/useLogTrackPlayerState';
import * as SplashScreen from 'expo-splash-screen';
import { fetchOrCreateLuminateUser, logOutLuminateUser } from '@/model/UserAPI';
import { Authenticator } from "@aws-amplify/ui-react-native";
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const App = () => {
  // Allows app-level Auth functions for all screens
  
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    GothamBlack: require('../assets/fonts/Gotham-Black.ttf'),
  });

  // React Native Track Player hook for setting up a custom track player
  const handleTrackPlayerLoaded = useSetupTrackPlayer({
    onLoad: handleTrackPlayerLoaded,
  });
  useLogTrackPlayerState();

  // Hub listens to Cognito Auth events which is used as a check for other Auth
  Hub.listen('auth', ({ payload }) => {
    switch (payload.event) {
      case 'signedIn':
        fetchOrCreateLuminateUser(payload);
        break;
      case 'signedOut':
        logOutLuminateUser();
        break;
      case 'signUp':
        console.log("");
        break;
      case 'tokenRefresh':
        console.log('Auth token refreshed');
        break;
      case 'tokenRefresh_failure':
        console.log('Failure in auth token refresh');
        break;
      case 'signInWithRedirect':
        console.log('signInWithRedirect API successful.');
        break;
      case 'signInWithRedirect_failure':
        console.log('signInWithRedirect API failure.');
        break;
      case 'customOAuthState':
        console.log('Custom state from CognitoHosted UI');
        break;
    }
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Authenticator.Provider>
      <StripeProvider publishableKey="pk_test_sCOFwBgBiNBBtMFnCogmpkp900QgzWio5i" merchantIdentifier="merchant.com.shareourstrength">
        <GestureHandlerRootView style={{flex: 1}}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
              <Stack.Screen name="other" options={{ headerShown: false }} />
              <Stack.Screen name="account" options={{ headerShown: false}} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </ThemeProvider>
        </GestureHandlerRootView>
      </StripeProvider>
    </Authenticator.Provider>
  );
}

export default App;