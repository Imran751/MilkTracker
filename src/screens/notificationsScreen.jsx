// src/screens/NotificationsScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HamburgerIcon from '../componets/hamburgerIcon';

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <HamburgerIcon />
      <Text style={styles.text}>Notifications Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NotificationsScreen;
