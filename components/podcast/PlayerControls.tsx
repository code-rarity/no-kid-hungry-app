import { TouchableOpacity, ViewStyle, StyleSheet } from "react-native";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";
import { ThemedView } from "@/components/ThemedView";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
 
type PlayerControlsProps = {
  style?: ViewStyle
}

type PlayerButtonProps = {
  style?: ViewStyle
  iconSize?: number
}

export const PlayerControls = ({style, iconSize}: PlayerControlsProps) => {
  return (
    <ThemedView style={[styles.container, style]}>
      <ThemedView style={styles.row}>
        <SkipToPreviousButton />

        <PlayPauseButton iconSize={80} style={{backgroundColor:'#f27622'}} />

        <SkipToNextButton />
      </ThemedView>
    </ThemedView>
  )
};

export const PlayPauseButton = ({style, iconSize}: PlayerButtonProps) => {
  const {playing} = useIsPlaying();

  return (
    <ThemedView style={[{ height: iconSize }, style]}>
      <TouchableOpacity activeOpacity={0.85} onPress={playing ? TrackPlayer.pause : TrackPlayer.play}>
        <MaterialCommunityIcons name={playing ? "pause" : "play"} size={iconSize} color={"#fff"} />
      </TouchableOpacity>
    </ThemedView>
  )
}

export const SkipToNextButton = ({iconSize = 30}: PlayerButtonProps) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToNext()}>
      <MaterialCommunityIcons name="fast-forward" size={iconSize} color={"#fff"} />
    </TouchableOpacity>
  )
}

export const SkipToPreviousButton = ({iconSize = 30}: PlayerButtonProps) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToPrevious()}>
      <MaterialCommunityIcons name="skip-backward" size={iconSize} color={"#fff"} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    backgroundColor:'transparent',
  },
  row: {
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    backgroundColor:'transparent',
  }
});