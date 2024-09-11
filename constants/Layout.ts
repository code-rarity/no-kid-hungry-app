import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Colors } from '@/constants/Colors';

export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
	headerLargeTitle: true,
	headerLargeStyle: {
		backgroundColor:'#fff',
		//position: 'relative', // <==== Comment this out and the header would show
	},
	headerLargeTitleStyle: {
		color: "#000",
	},
	headerTintColor: "#000",
	headerTransparent: true,
	headerBlurEffect: 'regular',
	headerShadowVisible: false,
}

export const screenPadding = {
  horizontal: 15,
}