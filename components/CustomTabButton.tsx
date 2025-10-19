import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
// Use the consistent default import for icons
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// This component is now much simpler. It is just the green button itself.
// All positioning is handled by the parent CustomTabBar component.
export default function CustomTabButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <MaterialCommunityIcons name="cart-heart" size={30} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    top: -20, // Lifts the button up into the cutout area
    justifyContent: 'center',
    alignItems: 'center',
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#64BD44',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});


