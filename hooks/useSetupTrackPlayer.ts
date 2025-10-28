import { useEffect } from 'react';
import TrackPlayer, { Capability } from 'react-native-track-player';

// This flag will live outside the component and persist for the app's entire lifecycle.
let isPlayerSetup = false;

export function useSetupTrackPlayer(options: { onLoad: () => void }) {
  const { onLoad } = options;

  useEffect(() => {
    // If the player is already set up, we don't need to do anything.
    if (isPlayerSetup) {
      return;
    }

    const setup = async () => {
      try {
        // Run the setup only once.
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
          // Define the capabilities of the player
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.Stop,
          ],
          compactCapabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
          ],
        });
        
        // Set the flag to true so this code never runs again.
        isPlayerSetup = true;
        onLoad();

      } catch (error) {
        console.error('Error setting up TrackPlayer:', error);
      }
    };

    setup();
  }, [onLoad]);
}
