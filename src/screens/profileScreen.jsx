// src/screens/ProfileScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HamburgerIcon from '../componets/hamburgerIcon';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <HamburgerIcon/>
      <Text style={styles.text}>Profile Screen</Text>
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

export default ProfileScreen;
