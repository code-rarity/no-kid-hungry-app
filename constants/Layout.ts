import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Colors } from '@/constants/Colors';

export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
	headerLargeTitle: true,
	headerLargeStyle: {
		backgroundColor:'#000',
		//position: 'relative', // <==== Comment this out and the header would show
		top: 100,
		left: 0,
		right: 0,
		bottom: 0,
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