// src/components/HamburgerIcon.js

import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HamburgerIcon = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      onPress={() => navigation.openDrawer()} 
      style={styles.iconContainer}
    >
      <Ionicons name="menu" size={30} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute', // Fixes the icon at the top left
    top: 40, // 20px from the top of the screen
    left: 10, // 10px from the left of the screen
    padding: 10, // Adds padding around the icon
  },
});

export default HamburgerIcon;
