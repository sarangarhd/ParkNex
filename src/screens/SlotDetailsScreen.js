import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import firebase from '../firebase';
import { colors } from '../global/Styles';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const SlotDetailsScreen = ({ route }) => {
  const { parkId } = route.params;
  const [slots, setSlots] = useState([]);
  const [parkName, setParkName] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const userId = auth().currentUser.uid;

  useEffect(() => {
    const fetchParkData = async () => {
      try {
        const parkRef = firebase.database().ref(`parkingData/${parkId}`);
        const parkSnapshot = await parkRef.once('value');
        const parkData = parkSnapshot.val();

        if (parkData) {
          setParkName(parkData.ParkName || 'Unknown Park');
          if (parkData.slots) {
            const formattedData = Object.keys(parkData.slots).map((key) => ({
              slotId: key,
              available: parkData.slots[key],
            }));
            setSlots(formattedData);
          }
        } else {
          setParkName('No park data found');
          setSlots([]);
        }
      } catch (error) {
        console.error('Error fetching park data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchParkData();
  }, [parkId]);

  const handleBooking = async (slotId) => {
    console.log(`handleBooking called with slotId: ${slotId}`);
    try {
      const bookingTime = new Date().toLocaleTimeString();
      const bookingDate = new Date().toLocaleDateString();

      await firebase.database().ref(`parkingData/${parkId}/slots/${slotId}`).set(false); // Update slot status to 'false' (BOOKED)
      console.log('Slot status updated in database.');

      // Create user reservation
      const userReservation = {
        slotId,
        parkId,
        bookingTime,
        bookingDate,
        userId,
        paymentStatus: "Pending",
      };
      await firebase.database().ref(`slotReservations`).push(userReservation);
      console.log('Slot reservation created.');

      navigation.navigate('MyPark'); // Redirect to MyPark screen
    } catch (error) {
      console.error('Error booking slot:', error);
    }
  };

  const confirmBooking = (slotId) => {
    console.log(`confirmBooking called with slotId: ${slotId}`);
    Alert.alert(
      'Confirm Booking',
      'Are you sure you want to book this slot?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => handleBooking(slotId),
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.slotContainer}>
      <Text style={styles.slotText}>Slot ID: {item.slotId}</Text>
      <Text style={styles.slotText}>Available: {item.available ? 'Yes' : 'No'}</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: item.available ? colors.buttons : colors.grey3 }]}
        disabled={!item.available}
        onPress={() => confirmBooking(item.slotId)}
      >
        <Text style={styles.buttonText}>{item.available ? 'Book Slot' : 'Unavailable'}</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.buttons} />
        <Text style={styles.loadingText}>Loading......</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Slot Details for {parkName}</Text>
      {slots.length > 0 ? (
        <FlatList
          data={slots}
          keyExtractor={(item) => item.slotId}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.noSlotsText}>No slots available</Text>
      )}
    </View>
  );
};

export default SlotDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pagebackground,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: colors.grey1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.buttons,
    marginBottom: 20,
  },
  slotContainer: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  slotText: {
    fontSize: 18,
    color: colors.grey1,
    marginBottom: 5,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noSlotsText: {
    fontSize: 18,
    color: colors.grey1,
    textAlign: 'center',
    marginTop: 20,
  },
});
