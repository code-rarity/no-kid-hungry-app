import { StyleSheet } from 'react-native';
import { ThemedView } from "@/components/ThemedView";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const DismissSymbol = ({...props}) => {
  const { viewHeight } = props; 
  const { top } = useSafeAreaInsets();

  if(viewHeight) {
    topDistance = top + 12;
  } else {
    topDistance = top;
  }

  return (
    <ThemedView style={[{top:topDistance}, styles.symbolContainer]}>
      <ThemedView accessible={false} style={styles.symbol} />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  symbolContainer: {
    position:'absolute',
    left:0, 
    right:0, 
    flexDirection:'row', 
    justifyContent:'center', 
    backgroundColor:'transparent',
  },
  symbol: {
    width:60, 
    height:8, 
    borderRadius:8, 
    backgroundColor:'#ededed', 
    opacity: 1,
  },
});
