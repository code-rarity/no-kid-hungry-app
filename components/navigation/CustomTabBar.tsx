import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const iconMap = {
  '(home)': 'home',
  'events': 'calendar-blank-outline',
  'donate': 'heart-outline',
  'fundraise': 'wallet-giftcard',
  'podcast': 'podcast',
};

export default function CustomTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View 
      style={[
        styles.tabBarContainer, 
        { marginBottom: insets.bottom > 0 ? insets.bottom - 5 : 15 }
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const iconName = iconMap[route.name] || 'help-circle';
        const iconColor = isFocused ? '#FFFFFF' : '#8E8E93';

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={styles.tabButton}
          >
            <View style={[styles.iconWrapper, isFocused && styles.activeIndicator]}>
              <MaterialCommunityIcons 
                name={iconName} 
                size={28} 
                color={iconColor}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 65,
    backgroundColor: '#1C1C1E',
    borderRadius: 32.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  activeIndicator: {
    backgroundColor: '#f27622',
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24, // Perfect circle
  },
});

