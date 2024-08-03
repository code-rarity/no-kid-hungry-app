import { TouchableOpacity, ViewStyle } from "react-native";
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
      <MaterialCommunityIcons name="backward" size={iconSize} color={"#fff"} />
    </TouchableOpacity>
  )
}