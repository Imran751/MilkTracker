// src/navigation/DrawerNavigation.js

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text } from 'react-native';

// Import the screens
import HomeScreen from '../screens/homeScreen';
import ProfileScreen from '../screens/profileScreen';
import NotificationsScreen from '../screens/notificationsScreen';
import SettingsScreen from '../screens/settingsScreen';
import SummaryScreen from '../screens/summaryScreen';

// Create the Drawer navigator
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator screenOptions={{ drawerType: 'slide', headerShown: false }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      <Drawer.Screen name="WaterSummary" component={SummaryScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
