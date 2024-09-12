import { useState, useEffect, useRef } from 'react';
import { Modal, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { DismissSymbol } from '@/components/DismissSymbol';

export default function CategoryDonateModal({visible, onClose}) {
  const color = useThemeColor({ light: '#fff', dark: '#000'}, 'text');
  const viewHeight = (Dimensions.get('window').height)*0.9;
  const translateY = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  // Reset translateY when modal visibility changes
  useEffect(() => {
    if (visible) {
      overlayOpacity.setValue(0.5);
      translateY.setValue(0);
    } else {
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 10,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  // Handle pan gesture events
  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const handleGestureEnd = (event) => {
    if (event.nativeEvent.translationY > 100) {
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true
        }),
        Animated.timing(translateY, {
          toValue: viewHeight, // Height of your modal (or larger to ensure dismissal)
          duration: 200,
          useNativeDriver: true
        })
      ]).start(() => onClose());
    } else {
      Animated.parallel([
        Animated.spring(overlayOpacity, {
          toValue: 0.5,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        })
      ]).start();
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <ThemedView style={[styles.modalOverlay]}>
          <PanGestureHandler onGestureEvent={onGestureEvent} onEnded={handleGestureEnd}>
            <Animated.View style={[styles.modalContainer, { transform: [{ translateY }], height: viewHeight }]}>
              <ThemedView style={styles.modalContent}>
                <DismissSymbol viewHeight={viewHeight} />
              </ThemedView>
            </Animated.View>
          </PanGestureHandler>
        </ThemedView>
      </Modal>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(253,185,23, 1)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  modalContent: {
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});
