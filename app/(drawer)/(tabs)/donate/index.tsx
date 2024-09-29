import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';
//import { useRoute } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ThankYouScreen() {
  //const route = useRoute();
  //const { amount, currency } = route.params.details;

  return (
    <ThemedView style={styles.container}>
      <MaterialCommunityIcons name="check-circle" style={{fontSize: 80, color:'#fff', backgroundColor:'#64BD44'}} />
      <ThemedText style={styles.thankyou}>
        Thank you! You have successfully donated ${10} to No Kid Hungry.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#64BD44',
    padding:15,
  },
  thankyou: {
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 36,
    backgroundColor:'#64BD44',
    color: '#fff',
    padding: 15,
    textAlign:'center',
  },
});