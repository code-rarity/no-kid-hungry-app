import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Colors } from '@/constants/Colors';

export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
  headerLargeTitle: true,
  headerLargeStyle: {
    backgroundColor: Colors.background,
  },
  headerLargeTitleStyle: {
    color: Colors.text,
  },
  headerTintColor: Colors.text,
  headerTransparent: true,
  headerBlurEffect: 'prominent',
  headerShadowVisible: false
}