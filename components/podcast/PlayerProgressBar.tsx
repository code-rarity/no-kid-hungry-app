import { ViewProps, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Slider } from "react-native-awesome-slider";
import TrackPlayer, { useProgress } from "react-native-track-player";
import { useSharedValue } from "react-native-reanimated";
import { useTrackPlayerVolume } from "@/hooks/useTrackPlayerVolume";
import { formatSecondsToMinutes } from "@/helpers/misc";

export const PlayerProgressBar = ({style}: ViewProps) => {
  const {duration, position} = useProgress(250);

  const isSliding = useSharedValue(false);
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);

  const trackElapsedTime = formatSecondsToMinutes(position);
  const trackRemainingTime = formatSecondsToMinutes(duration - position);

  if(!isSliding.value) {
    progress.value = duration > 0 ? position / duration : 0
  }

  return (
    <ThemedView style={style}>
      <Slider
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        thumbWidth={0}
        renderBubble={() => null}
        onSlidingStart={() => (isSliding.value = true)}
        onValueChange={async(value) => {
          await TrackPlayer.seekTo(value * duration)
        }}
        onSlidingComplete={async(value) => {
          if(!isSliding.value) return
          isSliding.value = false
          await TrackPlayer.seekTo(value + duration)
        }}
        containerStyle={{height:7, borderRadius:16}}
        theme={{
          minimumTrackTintColor: "#000",
          maximumTrackTintColor: "#fff"
        }}
      />

      <ThemedView style={styles.timeRow}>
        <ThemedText style={styles.timeText}>{trackElapsedTime}</ThemedText>
        <ThemedText style={styles.timeText}>{'-'} {trackRemainingTime}</ThemedText>
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop:20,
    backgroundColor:'transparent',
  },
  timeText: {
    color:"#fff",
    opacity: 0.7,
    fontSize: 14,
    letterSpacing: 0.7,
    fontWeight:'bold',
    backgroundColor:'transparent',
  }
});