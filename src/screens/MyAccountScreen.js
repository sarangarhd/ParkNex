import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../global/Styles';

const MyAccountScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth().currentUser;
      if (user) {
        const userId = user.uid;
        const userRef = database().ref(`/users/${userId}`);
        userRef.once('value').then(snapshot => {
          setUserData(snapshot.val());
          setLoading(false);
        });
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.buttons} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Account</Text>
      </View>
      {userData ? (
        <>
          {userData.avatar ? (
            <Image source={{ uri: userData.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Icon name="user" size={50} color={colors.buttons} />
            </View>
          )}
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Name</Text>
            <Text style={styles.info}>{userData.name}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Vehicle Number</Text>
            <Text style={styles.info}>{userData.vehicle_number}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Email</Text>
            <Text style={styles.info}>{userData.email}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Phone Number</Text>
            <Text style={styles.info}>{userData.phone_number}</Text>
          </View>
        </>
      ) : (
        <Text style={styles.noDataText}>No user data available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 20,
    backgroundColor: colors.pagebackground,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: colors.buttons,
    paddingVertical: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.cardbackground,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: colors.buttons,
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: colors.buttons,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cardbackground,
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.grey3,
  },
  info: {
    fontSize: 18,
    color: colors.grey1,
  },
  noDataText: {
    fontSize: 18,
    color: colors.grey1,
    marginTop: 20,
  },
});

export default MyAccountScreen;
