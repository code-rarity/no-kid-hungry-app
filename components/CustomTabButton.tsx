import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Svg, {Path} from 'react-native-svg';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { BlurView } from 'expo-blur';

export default function CustomTabButton({bgColor, presentPayScreen, ...props}) {
  /*const CustomTabButtonCutout = ({ color = 'transparent', ...props }) => {
    return (
      <Svg width={75} height={61} viewBox="0 0 75 61" {...props}>
        <Path
          d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
          fill={color}
        />
      </Svg>
    );
  };

  <CustomTabButtonCutout style={styles.background} />
  */

  return (
    <View style={styles.container} pointerEvents="box-none">
      <TouchableOpacity style={styles.button} onPress={() => presentPayScreen()}>
        <MaterialCommunityIcons name="cart-heart" size={30} color={"#fff"} />
      </TouchableOpacity>
      <Text style={styles.text}>Donate</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width:75,
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
  },
  button: {
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: '#64BD44',
    overflow:'hidden'    
  },
  text: {
    fontSize:10.5,
    top:-23,
  }
});
