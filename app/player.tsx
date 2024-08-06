import { ActivityIndicator, StyleSheet, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { screenPadding } from '@/constants/Layout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useActiveTrack } from 'react-native-track-player';
import { MovingText } from '@/components/podcast/MovingText';

const DismissPlayerSymbol = () => {
  const {top, bottom} = useSafeAreaInsets();

  return (
    <ThemedView style={{position:'absolute', top: top+16, left:0, right:0, flexDirection:'row', justifyContent:'center', backgroundColor:'transparent'}}>
      <ThemedView accessible={false} style={{ width:60, height:8, borderRadius:8, backgroundColor:'#fff', opacity: 0.7}} />
    </ThemedView>
  )
}

const PlayerScreen = () => {
  const {top, bottom} = useSafeAreaInsets();
  const activeTrack = useActiveTrack();

  if(!activeTrack) {
    return (
      <ThemedView style={{justifyContent:'center'}}>
        <ActivityIndicator color={"#fff"} />
      </ThemedView>
    )
  }

  return (
    <ThemedView style={styles.overlayContainer}>
      <DismissPlayerSymbol />
      <ThemedView style={{flex:1, marginTop:top+70, marginBottom:bottom, backgroundColor:'transparent'}}>
        <ThemedView style={styles.artworkImageContainer}>
          <Image source={{ uri: activeTrack.image }} resizeMode="cover" style={styles.artworkImage} />
        </ThemedView>

        <ThemedView style={{flex:1, backgroundColor:'transparent'}}>
          <ThemedView style={{marginTop:'auto', backgroundColor:'transparent'}}>
            <ThemedView style={{height:60, backgroundColor:'transparent'}}>
              <ThemedView style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', backgroundColor:'transparent'}}>
                <ThemedView style={styles.trackTitleContainer}>
                  <MovingText text={activeTrack.title ?? ''} animationThreshold={30} style={styles.trackTitleText} />
                </ThemedView>
              </ThemedView>
            </ThemedView>
          </ThemedView>        
        </ThemedView>

      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    flex:1,
    paddingHorizontal: screenPadding.horizontal,
    backgroundColor:'rgba(242,118,34,1)',
  },
  artworkImageContainer: {
    shadowOffset: {
      width:0,
      height:8,
    },
    shadowOpacity:0.44,
    shadowRadius: 11.0,
    flexDirection: 'row',
    justifyContent: 'center',
    height:'45%',
    backgroundColor:'transparent',
  },
  artworkImage: {
    width:'100%',
    height:'100%',
    resizeMode:'cover',
    borderRadius: 12,
  },
  trackTitleContainer: {
    flex:1,
    overflow: 'hidden',
    backgroundColor:'transparent',    
  },
  trackTitleText: {
    fontSize:22,
    fontWeight:'700',
    backgroundColor:'transparent',    

  },
});

export default PlayerScreen;
