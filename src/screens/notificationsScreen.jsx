// src/screens/NotificationsScreen.js

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import HamburgerIcon from '../componets/hamburgerIcon';

const NotificationsScreen = () => {
  // Placeholder for future notification data
  // Sample notifications (static for demo purposes)
  const notifications = [
    {
      title: 'Welcome to the App!',
      body: 'Thanks for signing up. Let us know if you need any help getting started.',
    },
    {
      title: 'New Feature Released',
      body: 'We’ve added dark mode! Check it out in your settings.',
    },
  ];


  return (
    <View style={styles.container}>
      <HamburgerIcon />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Notifications</Text>

        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No Notifications</Text>
            <Text style={styles.emptySubtitle}>
              You're all caught up for now.
            </Text>
          </View>
        ) : (
          notifications.map((item, index) => (
            <View key={index} style={styles.notificationCard}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationBody}>{item.body}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingTop: Platform.OS === 'ios' ? 90 : 70,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },
  emptyState: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  notificationBody: {
    fontSize: 14,
    color: '#666',
  },
});

export default NotificationsScreen;
