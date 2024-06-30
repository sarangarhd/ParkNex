import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import firebase from '../firebase'; // Adjust the path according to your project structure
import { colors } from '../global/Styles';

const PaymentProcessScreen = () => {
  const [loading, setLoading] = useState(true);
  const [reservation, setReservation] = useState(null);
  const [parkingPrice, setParkingPrice] = useState(0);
  const [totalCharge, setTotalCharge] = useState(0);
  const [duration, setDuration] = useState({ bookingToArrival: 0, arrivalToDeparture: 0 });
  const route = useRoute();
  const { reservationId } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchReservationDetails = async () => {
      try {
        const reservationRef = firebase.database().ref(`slotReservations/${reservationId}`);
        const reservationSnapshot = await reservationRef.once('value');
        const reservationData = reservationSnapshot.val();

        const parkRef = firebase.database().ref(`parkingData/${reservationData.parkId}`);
        const parkSnapshot = await parkRef.once('value');
        const parkData = parkSnapshot.val();

        const parseDateTime = (date, time) => {
          const [hours, minutes, seconds] = time.split(':').map(Number);
          const [month, day, year] = date.split('/').map(Number);
          return new Date(year, month - 1, day, hours, minutes, seconds);
        };

        const bookingTime = parseDateTime(reservationData.bookingDate, reservationData.bookingTime);
        const arrivalTime = parseDateTime(reservationData.bookingDate, reservationData.arrivalTime);
        const departureTime = parseDateTime(reservationData.bookingDate, reservationData.departureTime);

        const bookingToArrivalDuration = Math.round((arrivalTime - bookingTime) / 60000); // duration in minutes
        const arrivalToDepartureDuration = Math.round((departureTime - arrivalTime) / 60000); // duration in minutes

        const parkingPrice = parseFloat(parkData.ParkPrice);

        let totalCharge = parkingPrice; // Initial charge for the first hour
        if (arrivalToDepartureDuration > 60) {
          totalCharge += Math.ceil((arrivalToDepartureDuration - 60) / 60) * parkingPrice; // Additional hourly charge
        }

        setReservation(reservationData);
        setParkingPrice(parkingPrice);
        setDuration({ bookingToArrival: bookingToArrivalDuration, arrivalToDeparture: arrivalToDepartureDuration });
        setTotalCharge(totalCharge);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reservation details:', error);
        setLoading(false);
      }
    };

    fetchReservationDetails();
  }, [reservationId]);

  const handlePayment = async () => {
    try {
      // Update slot status to 'true' (available)
      await firebase.database().ref(`parkingData/${reservation.parkId}/slots/${reservation.slotId}`).set(true);
      
      // Update payment status to 'Complete'
      await firebase.database().ref(`slotReservations/${reservationId}`).update({ paymentStatus: 'Complete' });
      //add payment 
      await firebase.database().ref(`slotReservations/${reservationId}`).update({ payment: totalCharge });

      Alert.alert('Payment Successful', `Total amount charged: Rs. ${totalCharge.toFixed(2)}`);
      navigation.navigate('Home'); // Redirect to home page
    } catch (error) {
      console.error('Error processing payment:', error);
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
    <View style={styles.container}>
      <Text style={styles.header}>Payment Process</Text>
      <View style={styles.billContainer}>
        <Text style={styles.billText}>Slot: {reservation.slotId}</Text>
        <Text style={styles.billText}>Booking Time: {reservation.bookingTime}</Text>
        <Text style={styles.billText}>Arrival Time: {reservation.arrivalTime}</Text>
        <Text style={styles.billText}>Departure Time: {reservation.departureTime}</Text>
        <Text style={styles.billText}>Booking to Arrival Duration: {duration.bookingToArrival} minutes</Text>
        <Text style={styles.billText}>Arrival to Departure Duration: {duration.arrivalToDeparture} minutes</Text>
        <Text style={styles.billText}>Parking Price (per hour): Rs. {parkingPrice}</Text>
        <Text style={styles.billText}>Total Charge: Rs. {totalCharge.toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handlePayment}
      >
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentProcessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.headerText,
    textAlign: 'center',
    marginBottom: 20,
  },
  billContainer: {
    backgroundColor: '#FFCDD2',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    marginVertical: 10,
  },
  billText: {
    fontSize: 18,
    color: colors.grey1,
    marginBottom: 5,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: colors.buttons,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
