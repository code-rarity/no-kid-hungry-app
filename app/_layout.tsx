import { DarkTheme, DefaultTheme, ThemeProvider, useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StripeProvider } from '@stripe/stripe-react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    GothamBlack: require('../assets/fonts/Gotham-Black.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <StripeProvider publishableKey="pk_test_sCOFwBgBiNBBtMFnCogmpkp900QgzWio5i" merchantIdentifier="merchant.com.shareourstrength">
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="episode" options={{ headerTitle: 'Listen to Episode'}} />
          <Stack.Screen name="story" options={{ headerTitle: ''}} />
          <Stack.Screen name="event" options={{ headerTitle: 'Join Our Event'}} />
          <Stack.Screen name="settings" options={{ headerTitle: 'Settings'}} />
          <Stack.Screen name="thankyou" options={{ headerTitle: '', headerStyle:{backgroundColor:'#64BD44'}}} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </StripeProvider>
  );
}
