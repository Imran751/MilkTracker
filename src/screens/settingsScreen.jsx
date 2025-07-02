// src/screens/SettingsScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import HamburgerIcon from '../componets/hamburgerIcon';

const SettingItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <View style={styles.settingLeft}>
      <Ionicons name={icon} size={22} color="#4A90E2" style={styles.settingIcon} />
      <Text style={styles.settingLabel}>{label}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#bbb" />
  </TouchableOpacity>
);

const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.hamburgerWrapper}>
        <HamburgerIcon />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.card}>
          <SettingItem
            icon="person-circle-outline"
            label="Account"
            onPress={() => console.log('Account Settings')}
          />
          <SettingItem
            icon="notifications-outline"
            label="Notifications"
            onPress={() => console.log('Notification Settings')}
          />
          <SettingItem
            icon="shield-checkmark-outline"
            label="Privacy & Security"
            onPress={() => console.log('Privacy')}
          />
          <SettingItem
            icon="language-outline"
            label="Language"
            onPress={() => console.log('Change Language')}
          />
          <SettingItem
            icon="help-circle-outline"
            label="Help & Support"
            onPress={() => console.log('Help')}
          />
          <SettingItem
            icon="information-circle-outline"
            label="About"
            onPress={() => console.log('About App')}
          />
        </View>

        <View style={styles.card}>
          <SettingItem
            icon="log-out-outline"
            label="Log Out"
            onPress={() => console.log('Logout')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  hamburgerWrapper: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 20,
    zIndex: 10,
  },
  scrollContainer: {
    paddingTop: Platform.OS === 'ios' ? 80 : 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 15,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});

export default SettingsScreen;
