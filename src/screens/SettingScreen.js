import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, Image, TouchableOpacity, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import firebase from '../firebase'; // Adjust the path according to your project structure
import { colors } from '../global/Styles';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

const SettingsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [parkData, setParkData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth().currentUser;
      if (user) {
        setUserId(user.uid);

        // Fetch user data
        const userRef = firebase.database().ref(`users/${user.uid}`);
        const userSnapshot = await userRef.once('value');
        const userData = userSnapshot.val();
        setUserData(userData);

        // Fetch park data if the user has a park
        const parkRef = firebase.database().ref(`parkingData/${user.uid}`);
        parkRef.on('value', (snapshot) => {
          const parkData = snapshot.val();
          setParkData(parkData);
        });

        if (userData.avatar) {
          setImageUrl(userData.avatar);
        }
      } else {
        console.error('User is not logged in');
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleChooseImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = response.assets[0];
        uploadImage(source.uri);
      }
    });
  };

  const uploadImage = async (uri) => {
    setUploading(true);
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const storageRef = storage().ref(`avatars/${userId}/${filename}`);
    const task = storageRef.putFile(uri);

    task.on('state_changed', (snapshot) => {
      console.log('snapshot: ', snapshot.state);
    });

    try {
      await task;
      const url = await storageRef.getDownloadURL();
      setImageUrl(url);
      await firebase.database().ref(`users/${userId}`).update({ avatar: url });
      Alert.alert('Success', 'Profile picture updated successfully');
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Something went wrong while uploading the image');
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await firebase.database().ref(`users/${userId}`).update(userData);
      Alert.alert('Success', 'User data updated successfully');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleUpdatePark = async () => {
    try {
      await firebase.database().ref(`parkingData/${userId}`).update(parkData);
      Alert.alert('Success', 'Park data updated successfully');
    } catch (error) {
      console.error('Error updating park data:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.buttons} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Information</Text>
          <TouchableOpacity onPress={handleChooseImage}>
            <Image source={{ uri: imageUrl || 'https://www.w3schools.com/w3images/avatar2.png' }} style={styles.avatar} />
            {uploading && <ActivityIndicator size="small" color={colors.buttons} />}
          </TouchableOpacity>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={userData.name}
            onChangeText={(text) => setUserData({ ...userData, name: text })}
          />
          <Text style={styles.label}>Vehicle Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Vehicle Number"
            value={userData.vehicle_number}
            onChangeText={(text) => setUserData({ ...userData, vehicle_number: text })}
          />
          <Button title="Update User Info" onPress={handleUpdateUser} />
        </View>

        {parkData && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Park Information</Text>
            <Text style={styles.label}>Park Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Park Name"
              value={parkData.ParkName}
              onChangeText={(text) => setParkData({ ...parkData, ParkName: text })}
            />
            <Text style={styles.label}>Price per hour</Text>
            <TextInput
              style={styles.input}
              placeholder="Park Price"
              keyboardType="numeric"
              value={String(parkData.ParkPrice)}
              onChangeText={(text) => setParkData({ ...parkData, ParkPrice: parseFloat(text) })}
            />
            <Text style={styles.label}>Discount</Text>
            <TextInput
              style={styles.input}
              placeholder="Discount"
              keyboardType="numeric"
              value={String(parkData.discount)}
              onChangeText={(text) => setParkData({ ...parkData, discount: parseFloat(text) })}
            />
            <Button title="Update Park Info" onPress={handleUpdatePark} />
            <Text style={styles.parkOwnerNote}>
              If you want to add more details or customize your park, contact admin@parknex.com or call 0112-456789.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.buttons,
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.grey1,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: colors.grey1,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey4,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  parkOwnerNote: {
    marginTop: 20,
    fontSize: 16,
    color: colors.grey1,
  },
});
