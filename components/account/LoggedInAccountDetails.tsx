import { StyleSheet } from 'react-native';
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export const LoggedInAccountDetails = ({...props}) => {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={{flex:1, flexDirection:'row', paddingTop:15, paddingBottom:15}}>
        <ThemedView style={{flex:1, backgroundColor:'transparent'}}>
          <ThemedText style={{fontSize:18, lineHeight:24}}>Welcome</ThemedText>
          <ThemedText style={{fontSize:24, lineHeight:28, fontWeight:'bold'}}>Ajay Alkondon</ThemedText>
        </ThemedView>
        <ThemedView style={{flex:1, backgroundColor:'transparent'}}>
          <ThemedText style={{fontSize:18, lineHeight:24, textAlign:'right'}}></ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={{flex:1, backgroundColor:"#64BD44", flexDirection:'row', padding:25, borderRadius:25}}>
        <ThemedView style={{flex:1, backgroundColor:'transparent'}}>
          <ThemedText style={{fontSize:12, lineHeight:20, color:'#fff'}}>TOTAL DONATIONS</ThemedText>
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
    height:180,
  },
});

