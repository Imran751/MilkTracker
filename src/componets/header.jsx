// src/components/Header.js

import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window'); // Get screen height

const Header = ({ userName }) => {
  return (
    <View style={styles.headerContainer}>
      {/* Left space is now empty */}

      {/* Centered Text */}
      <Text style={styles.greetingText}>Hi, welcome Back: {userName} Ashraf </Text>

      {/* Profile image on the right */}
      <TouchableOpacity style={styles.profileContainer}>
        <Image 
          source={require('../../assets/profile.png')} 
          style={styles.profileImage} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    width: '100%', // Full width
    height: height * 0.1, // 10% of the screen height
    position: 'absolute', // Fixes the header at the top
    top: 30,
    left: 0,
    right: 0,
    elevation: 4, // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow for iOS
    shadowOpacity: 0.8, // Shadow intensity for iOS
    shadowRadius: 2, // Shadow spread for iOS
  },
  greetingText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileContainer: {
    padding: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20, // Makes the profile image circular
  },
});

export default Header;
