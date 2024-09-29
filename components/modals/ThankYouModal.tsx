import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Animated, Modal, StyleSheet, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useRef } from 'react';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { DismissSymbol } from '@/components/DismissSymbol';

export default function ThankYouModal({...props}) {
  const { visible, onClose } = props;
  const viewHeight = (Dimensions.get('window').height*.25);
  const translateY = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

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

  //const route = useRoute();
  //const { amount, currency } = route.params.details;

  return (
    <GestureHandlerRootView style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={visible}>
        <ThemedView style={styles.modalOverlay}>
          <PanGestureHandler onGestureEvent={onGestureEvent} onEnded={handleGestureEnd}>
            <Animated.View style={[styles.modalContainer, { transform: [{ translateY }], height: viewHeight }]}>
              <DismissSymbol />
              <ThemedText style={styles.modalText}>Thank you for donating!</ThemedText>
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
    position:'absolute'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor:'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    alignItems: 'center',
    fontSize:24,
    fontWeight:900,
  },
});