import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ComponentProps } from 'react';
import { RepeatMode } from 'react-native-track-player';
import { useTrackPlayerRepeatMode } from '@/hooks/useTrackPlayerRepeatMode';
import { match } from 'ts-pattern';

const repeatOrder = [
  RepeatMode.Off,
  RepeatMode.Track,
  RepeatMode.Queue
] as const;

type IconProps = Omit<ComponentProps<typeof MaterialCommunityIcons>,'name'>;
type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

export const PlayerRepeatToggle = ({ ...iconProps }: IconProps) => {
  const { repeatMode, changeRepeatMode } = useTrackPlayerRepeatMode();

  const toggleRepeatMode = () => {
    if(repeatMode == null) return

    const currentIndex = repeatOrder.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % repeatMode.length;

    changeRepeatMode(repeatOrder[nextIndex]);
  }

  const icon = match(repeatMode)
    .returnType<IconName>()
    .with(RepeatMode.Off, () => 'repeat-off')
    .with(RepeatMode.Track, () => 'repeat-once')
    .with(RepeatMode.Queue, () => 'repeat')
    .otherwise(() => 'repeat-off');

    return (
      <MaterialCommunityIcons 
        name={icon} 
        onPress={toggleRepeatMode} 
        color={"#fff"}
        {...iconProps} 
      />
    )
}