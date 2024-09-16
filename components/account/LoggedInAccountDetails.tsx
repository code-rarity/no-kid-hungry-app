import { StyleSheet } from 'react-native';
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const LoggedInUserDetails = ({...props}) => {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={{flex:1, flexDirection:'row', paddingTop:25, paddingBottom:15}}>
        <ThemedView style={{flex:1, backgroundColor:'transparent'}}>
          <ThemedText style={{fontSize:18, lineHeight:24, paddingBottom:5}}>Welcome</ThemedText>
          <ThemedText style={{fontSize:24, lineHeight:28, fontWeight:'bold'}}>Ajay Alkondon</ThemedText>
        </ThemedView>
        <ThemedView style={{flex:1, backgroundColor:'transparent'}}>
          <ThemedText style={{fontSize:18, lineHeight:24, textAlign:'right'}}></ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={{flex:1, flexDirection:'row', paddingTop:25, paddingBottom:25, paddingLeft:15, paddingRight:15, backgroundColor:'#FDB917', borderRadius:25}}>
        <ThemedView style={{flex:1, backgroundColor:'transparent'}}>
          <ThemedText style={{fontSize:12, lineHeight:20, paddingBottom:10, color:'#fff'}}>TOTAL DONATIONS</ThemedText>
          <ThemedText style={{fontSize:24, lineHeight:30, fontWeight:'bold', color:'#fff'}}>$512.40</ThemedText>
        </ThemedView>
        <ThemedView style={{flex:1, backgroundColor:'transparent'}}>
          <ThemedText style={{fontSize:18, lineHeight:24, textAlign:'right', color:'#fff'}}>Goal Progress</ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
