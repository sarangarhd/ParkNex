import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const ParkScreen = () => {
  const [parkData, setParkData] = useState([]);
  const [bookingEnabled, setBookingEnabled] = useState(true);
  const navigation = useNavigation();
  const userId = auth().currentUser.uid;

  useEffect(() => {
    const fetchParkData = async () => {
      try {
        const ref = database().ref('/slots');
        ref.on('value', (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const formattedData = Object.keys(data).map((key) => ({
              id: key,
              status: data[key],
            }));
            setParkData(formattedData);
          } else {
            setParkData([]);
          }
        });
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchParkData();
  }, []);

  const handlePress = async (id) => {
    if (!bookingEnabled) {
      alert('Booking is temporarily disabled.');
      return;
    }

    Alert.alert(
      'Confirm Booking',
      'Confirm your booking now?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => confirmBooking(id),
        },
      ],
      { cancelable: false }
    );
  };

  const confirmBooking = async (slotId) => {
    try {
      const userRef = database().ref(`/users/${userId}`);
      const userSnapshot = await userRef.once('value');
      const userData = userSnapshot.val();

      const parkRef = database().ref(`/slots/${slotId}`);
      await parkRef.set(false); // Update the status to 'false' (BOOKED)

      setParkData((prevData) =>
        prevData.map((slot) => (slot.id === slotId ? { ...slot, status: false } : slot))
      );

      const reservationTime = new Date().toLocaleTimeString();
      const reservationDate = new Date().toLocaleDateString();

      const newReservation = {
        parkId: 'yourParkId', // You need to replace 'yourParkId' with the actual park ID
        slotId,
        reservationTime,
        reservationDate,
      };

      await database().ref(`/userReservations/${userId}`).push(newReservation);
      await database().ref(`/parkReservations/yourParkId`).push({
        ...newReservation,
        userName: userData.name,
        userVehicleNumber: userData.vehicle_number,
      });

      navigation.navigate('MyPark');
    } catch (error) {
      console.error('Error updating data: ', error);
    }
  };

  const handleBooking = () => {
    if (!bookingEnabled) {
      alert('Booking is temporarily disabled.');
      return;
    }
    const availableSlot = parkData.find((slot) => slot.status);
    if (availableSlot) {
      handlePress(availableSlot.id);
    } else {
      alert('No available slots to book.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Parking Slots</Text>
        <Text style={styles.subHeader}>1st Floor</Text>
        <View style={styles.parkingArea}>
          {parkData.map((slot) => (
            <View key={slot.id} style={styles.slotContainer}>
              <TouchableOpacity
                style={[
                  styles.slot,
                  slot.status ? styles.available : styles.booked,
                ]}
                onPress={() => slot.status && handlePress(slot.id)}
                disabled={!slot.status || !bookingEnabled}
              >
                <Text style={styles.slotText}>{slot.id}</Text>
                <Text style={styles.statusText}>
                  {slot.status ? 'AVAILABLE' : 'BOOKED'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Book Now" onPress={handleBooking} disabled={!bookingEnabled} />
      </View>
    </View>
  );
};

export default ParkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  subHeader: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  parkingArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  slotContainer: {
    width: '45%',
    marginVertical: 10,
  },
  slot: {
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
  },
  booked: {
    backgroundColor: '#FFCDD2',
    borderColor: '#D32F2F',
  },
  available: {
    backgroundColor: '#C8E6C9',
    borderColor: '#388E3C',
  },
  slotText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusText: {
    marginTop: 10,
    fontSize: 14,
    color: '#757575',
  },
  buttonContainer: {
    margin: 20,
  },
});
