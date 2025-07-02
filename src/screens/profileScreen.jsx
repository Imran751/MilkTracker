// src/screens/ProfileScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import HamburgerIcon from '../componets/hamburgerIcon';

const ProfileScreen = () => {
  const user = {
    name: 'Haji Ashraf',
    email: 'muhammad.ali@example.com',
    phone: '+92 3XX XXXXXXX',
    address: 'Street 12, Block B, Sargodha',
    memberSince: 'July 2024',
    avatar: 'https://i.pravatar.cc/150?img=68',
  };

  const ProfileDetail = ({ icon, label, value }) => (
    <View style={styles.detailRow}>
      <Ionicons name={icon} size={20} color="#555" style={styles.detailIcon} />
      <View>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );

  const ProfileAction = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <Ionicons name={icon} size={22} color="#4A90E2" style={styles.actionIcon} />
      <Text style={styles.actionText}>{label}</Text>
      <Ionicons name="chevron-forward" size={20} color="#bbb" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Hamburger outside ScrollView for touchability */}
      <View style={styles.hamburgerWrapper}>
        <HamburgerIcon />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.userName}>{user.name || 'User'}</Text>
          <Text style={styles.userEmail}>{user.email || '-'}</Text>

          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Account Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Details</Text>
          <ProfileDetail icon="mail-outline" label="Email" value={user.email} />
          <ProfileDetail icon="call-outline" label="Phone" value={user.phone} />
          <ProfileDetail icon="location-outline" label="Address" value={user.address} />
          <ProfileDetail icon="calendar-outline" label="Member Since" value={user.memberSince} />
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>
          <ProfileAction icon="key-outline" label="Change Password" onPress={() => console.log('Change Password')} />
          <ProfileAction icon="log-out-outline" label="Logout" onPress={() => console.log('Logout')} />
          <ProfileAction icon="information-circle-outline" label="About App" onPress={() => console.log('About App')} />
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#4A90E2',
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: '#E0F2F7',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 25,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailIcon: {
    marginRight: 15,
    width: 24,
  },
  detailLabel: {
    fontSize: 13,
    color: '#999',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionIcon: {
    marginRight: 15,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

export default ProfileScreen;
