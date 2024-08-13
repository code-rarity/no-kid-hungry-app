import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Colors } from '@/constants/Colors';

export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
	headerLargeTitle: true,
	headerLargeStyle: {
		backgroundColor:'#000',
	},
	headerLargeTitleStyle: {
		color: "#fff",
	},
	headerTintColor: "#fff",
	headerTransparent: true,
	headerBlurEffect: 'regular',
	headerShadowVisible: false,
}

export const screenPadding = {
  horizontal: 15,
}