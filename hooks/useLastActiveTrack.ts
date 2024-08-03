import { useActiveTrack } from "react-native-track-player"; 

export const useLastActiveTrack = () => {
	const activeTrack = useActiveTrack();
	const [lastActive, setLastActiveTrack] = useState();
}