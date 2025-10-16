import { StyleSheet, TouchableOpacity, View, Text, useColorScheme } from 'react-native';
import Svg, {Path} from 'react-native-svg';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaskedView from '@react-native-masked-view/masked-view';
import { BlurView } from 'expo-blur';

export default function CustomTabButton({presentPayScreen, ...props}) {
  const colorScheme = useColorScheme();

  // SVG component for the cutout shape that will be used as the mask
  const CustomTabButtonCutout = ({ ...props }) => {
    return (
      <View style={{backgroundColor: 'transparent'}}>
        <Svg width={75} height={61} viewBox="0 0 75 61" {...props}>
          <Path
            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
            fill={'#fff'} // The fill color for a mask should be an opaque color
          />
        </Svg>
      </View>
    );
  };

  return (
    <View style={styles.container} pointerEvents="box-none">
      <MaskedView
        style={styles.background}
        maskElement={<CustomTabButtonCutout />}
      >
        <BlurView
          intensity={80}
          style={StyleSheet.absoluteFill}
        />
      </MaskedView>
      <TouchableOpacity style={styles.button} onPress={() => presentPayScreen()}>
        <MaterialCommunityIcons name="cart-heart" size={30} color={"#fff"} />
      </TouchableOpacity>
      <Text style={[styles.text, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Donate</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width:75,
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    width: 75,
    height: 61,
  },
  button: {
    top: -22.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#64BD44',
    zIndex: 1,
  },
  text: {
    fontSize:10.5,
    top:-15,
  }
});

