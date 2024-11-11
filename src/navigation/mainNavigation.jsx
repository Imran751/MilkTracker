import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';

// Import your separate screens
import HomeScreen from '../screens/homeScreen';
import ProfileScreen from '../screens/profileScreen';
import SummaryScreen from '../screens/summaryScreen';
import NotificationsScreen from '../screens/notificationsScreen';  // Assuming NotificationsScreen.jsx exists
import SettingsScreen from '../screens/settingsScreen';  // Assuming SettingsScreen.jsx exists

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Drawer Navigator for Home Screen
const HomeScreenDrawer = () => (
  <Drawer.Navigator screenOptions={{ drawerType: 'slide', headerShown: false }}>
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Profile" component={ProfileScreen} />
    <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    <Drawer.Screen name="Settings" component={SettingsScreen} />
  </Drawer.Navigator>
);

// Main Tab Navigator
const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Milk') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Water') {
          iconName = focused ? 'water' : 'water-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Milk" component={HomeScreenDrawer} options={{ headerShown: false }} />
    <Tab.Screen name="Water" component={SummaryScreen} />
  </Tab.Navigator>
);

// Main Navigation Component
export default function MainNavigation() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <MainTabNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
