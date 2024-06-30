import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import firebase from '../firebase'; // Adjust the path according to your project structure
import { colors } from '../global/Styles';
import PaymentProcessScreen from './PaymentProcessScreen';

const BusinessConsoleScreen = ({ navigation }) => {
  const [parkData, setParkData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [userId, setUserId] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [newParkData, setNewParkData] = useState({
    ParkName: '',
    NumberOfSpaces: '',
    ParkPrice: '',
    coordinates: { lat: '', log: '' }
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const user = firebase.auth().currentUser;
      if (user) {
        setUserId(user.uid);
      } else {
        // Handle the case where the user is not logged in
        console.error('User is not logged in');
        return;
      }

      const ref = firebase.database().ref(`parkingData/${user.uid}`);
      ref.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setParkData(data);
          setIsNewUser(false);
        } else {
          setIsNewUser(true);
        }
        setLoading(false);
      });

      const reservationRef = firebase.database().ref(`slotReservations`).orderByChild('parkId').equalTo(user.uid);
      reservationRef.on('value', async (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const formattedData = Object.keys(data)
            .map(async (key) => {
              const reservation = data[key];
              const userSnapshot = await firebase.database().ref(`users/${reservation.userId}`).once('value');
              const userData = userSnapshot.val();
              return {
                ...reservation,
                id: key, // Add the key for later use
                userName: userData.name,
                userVehicle: userData.vehicle_number,
              };
            });

          const resolvedData = await Promise.all(formattedData);
          const filteredData = resolvedData.filter(reservation => reservation.paymentStatus === 'Pending');
          setReservations(filteredData);
        }
      });
    };

    fetchUserData();
  }, []);

  const handleCreateParkingData = async () => {
    const { ParkName, NumberOfSpaces, ParkPrice, coordinates } = newParkData;
    if (!ParkName || !NumberOfSpaces || !ParkPrice || !coordinates.lat || !coordinates.log) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    const defaultParkingData = {
      AvailableSlots: 10,
      NumberOfReviews: 100,
      NumberOfSpaces: NumberOfSpaces,
      ParkName: ParkName,
      ParkPrice: ParkPrice,
      ParkRating: 4,
      Rating: 4,
      averageReview: 4,
      coordinates: {
        lat: coordinates.lat,
        log: coordinates.log
      },
      discount: 20,
      farAway: 2,
      id: userId,
      images: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_aeuegLgpPUhpc5Bh0G0MlPlxJ6Mta--7iQ&usqp=CAU",
      slots: {
        A1: true,
        A2: true,
        A3: true,
        A4: true,
        A5: true,
        A6: true,
        A7: true,
        A8: true,
        A9: true,
        A10: true
      }
    };

    try {
      const ref = firebase.database().ref(`parkingData/${userId}`);
      await ref.set(defaultParkingData);
      setParkData(defaultParkingData);
      setIsNewUser(false);
    } catch (error) {
      console.error('Error creating data: ', error);
    }
  };

  const handleArrived = async (reservationId) => {
    const arrivalTime = new Date().toLocaleTimeString();

    try {
      await firebase.database().ref(`slotReservations/${reservationId}`).update({ arrivalTime });
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.id === reservationId ? { ...reservation, arrivalTime } : reservation
        )
      );
    } catch (error) {
      console.error('Error updating arrival time:', error);
    }
  };

  const handlePayment = async (reservationId) => {
    const departureTime = new Date().toLocaleTimeString();

    try {
      await firebase.database().ref(`slotReservations/${reservationId}`).update({ departureTime });
      navigation.navigate('PaymentProcessScreen', { reservationId });
    } catch (error) {
      console.error('Error updating departure time:', error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color={colors.buttons} />;
  }

  if (isNewUser) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Icon
            name="arrow-back"
            type="ionicon"
            color={colors.buttons}
            size={30}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.header}>Business Console</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.subHeader}>Create Business Account </Text>
          <TextInput
            style={styles.input}
            placeholder="Parking Name"
            value={newParkData.ParkName}
            onChangeText={(text) => setNewParkData({ ...newParkData, ParkName: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Number of Spaces"
            keyboardType="numeric"
            value={newParkData.NumberOfSpaces}
            onChangeText={(text) => setNewParkData({ ...newParkData, NumberOfSpaces: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Park Price"
            keyboardType="numeric"
            value={newParkData.ParkPrice}
            onChangeText={(text) => setNewParkData({ ...newParkData, ParkPrice: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Latitude"
            keyboardType="numeric"
            value={newParkData.coordinates.lat}
            onChangeText={(text) => setNewParkData({ ...newParkData, coordinates: { ...newParkData.coordinates, lat: text } })}
          />
          <TextInput
            style={styles.input}
            placeholder="Longitude"
            keyboardType="numeric"
            value={newParkData.coordinates.log}
            onChangeText={(text) => setNewParkData({ ...newParkData, coordinates: { ...newParkData.coordinates, log: text } })}
          />
          <Button title="Create" onPress={handleCreateParkingData} />
        </ScrollView>
      </View>
    );
  }

  const availableSlots = parkData.slots ? Object.keys(parkData.slots).filter(slot => parkData.slots[slot]).length : 0;
  const bookedSlots = parkData.slots ? Object.keys(parkData.slots).filter(slot => !parkData.slots[slot]).length : 0;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Icon
          name="arrow-back"
          type="ionicon"
          color={colors.buttons}
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.header}>Business Console</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.slotInfoContainer}>
          <View style={styles.slotBox}>
            <Text style={styles.slotBoxTitle}>Available Slots</Text>
            <Text style={styles.slotBoxCount}>{availableSlots}</Text>
          </View>
          <View style={styles.slotBox}>
            <Text style={styles.slotBoxTitle}>Booked Slots</Text>
            <Text style={styles.slotBoxCount}>{bookedSlots}</Text>
          </View>
        </View>
        <Text style={styles.subHeader}>Booked Slots</Text>
        <View style={styles.parkingArea}>
          {reservations.map((reservation, index) => (
            <View key={index} style={styles.reservationContainer}>
              <Text style={styles.slotText}>Slot: {reservation.slotId}</Text>
              <Text style={styles.slotText}>Date: {reservation.bookingDate}</Text>
              <Text style={styles.slotText}>Time: {reservation.bookingTime}</Text>
              <Text style={styles.slotText}>User: {reservation.userName}</Text>
              <Text style={styles.slotText}>Vehicle: {reservation.userVehicle}</Text>
              {!reservation.arrivalTime ? (
                <TouchableOpacity
                  style={styles.arrivedButton}
                  onPress={() => handleArrived(reservation.id)}
                >
                  <Text style={styles.buttonText}>Arrived</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.paymentButton}
                  onPress={() => handlePayment(reservation.id)}
                >
                  <Text style={styles.buttonText}>Payment</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default BusinessConsoleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: colors.statusbar,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.headerText,
    marginLeft: 10,
  },
  scrollContainer: {
    padding: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.grey1,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey4,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  parkingArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  slotContainer: {
    width: '45%',
    marginVertical: 10,
  },
  slot: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
  },
  booked: {
    backgroundColor: '#FFCDD2',
    borderColor: '#D32F2F',
  },
  slotText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.grey1,
  },
  statusText: {
    marginTop: 10,
    fontSize: 14,
    color: colors.grey3,
  },
  slotInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  slotBox: {
    width: '48%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: colors.buttons,
    alignItems: 'center',
  },
  slotBoxTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.cardbackground,
  },
  slotBoxCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.cardbackground,
    marginTop: 10,
  },
  reservationContainer: {
    backgroundColor: '#FFCDD2',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    marginVertical: 10,
    width: '100%',
  },
  arrivedButton: {
    backgroundColor: colors.buttons,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  paymentButton: {
    backgroundColor: colors.grey3,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
