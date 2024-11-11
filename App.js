// Root.js

import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MainNavigation from './src/navigation/mainNavigation';

export default function Root() {
  const [showMainNav, setShowMainNav] = useState(false);

  // If button is clicked, show MainNavigation
  if (showMainNav) {
    return <MainNavigation />;
  }

  // Landing screen with a button to proceed to MainNavigation
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MilkTrack</Text>
      <Button 
        title="Go to App"
        onPress={() => setShowMainNav(true)} 
      />
    </View>
  );
}

// Basic styling for the landing screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
