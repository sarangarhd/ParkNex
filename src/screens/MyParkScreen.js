import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import firebase from '../firebase';
import { colors } from '../global/Styles';
import auth from '@react-native-firebase/auth';

const MyParkScreen = () => {
  const [newBookings, setNewBookings] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = auth().currentUser.uid;

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservationRef = firebase.database().ref(`slotReservations`).orderByChild('userId').equalTo(userId);
        reservationRef.on('value', async (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const formattedData = Object.keys(data).map(async (key) => {
              const reservation = data[key];
              const parkSnapshot = await firebase.database().ref(`parkingData/${reservation.parkId}`).once('value');
              const parkData = parkSnapshot.val();
              return {
                ...reservation,
                parkName: parkData.ParkName,
              };
            });
            const resolvedData = await Promise.all(formattedData);
            setNewBookings(resolvedData.filter(reservation => reservation.paymentStatus === 'Pending'));
            setBookingHistory(resolvedData.filter(reservation => reservation.paymentStatus === 'Complete'));
          }
        });
      } catch (error) {
        console.error('Error fetching reservations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [userId]);

  const renderItem = ({ item }) => (
    <View style={[
      styles.reservationContainer,
      item.paymentStatus === 'Pending' ? styles.newBooking : styles.oldBooking
    ]}>
      <Text style={styles.reservationText}>Park: {item.parkName}</Text>
      <Text style={styles.reservationText}>Slot: {item.slotId}</Text>
      <Text style={styles.reservationText}>Booking Time: {item.bookingTime}</Text>
      {item.arrivalTime && <Text style={styles.reservationText}>Arrival Time: {item.arrivalTime}</Text>}
      {item.departureTime && <Text style={styles.reservationText}>Departure Time: {item.departureTime}</Text>}
      {item.payment && <Text style={styles.reservationText}>Payment: Rs. {item.payment}</Text>}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.buttons} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Reservations</Text>
      
      <Text style={styles.sectionTitle}>New Bookings</Text>
      {newBookings.length > 0 ? (
        <FlatList
          data={newBookings}
          keyExtractor={(item) => item.slotId}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.noReservationsText}>No new bookings found</Text>
      )}
      
      <Text style={styles.sectionTitle}>Booking History</Text>
      {bookingHistory.length > 0 ? (
        <FlatList
          data={bookingHistory}
          keyExtractor={(item) => item.slotId}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.noReservationsText}>No booking history found</Text>
      )}
    </View>
  );
};

export default MyParkScreen;

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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.buttons,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.grey1,
    marginBottom: 10,
    marginTop: 20,
  },
  reservationContainer: {
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    width: '100%',
  },
  newBooking: {
    backgroundColor: '#ADD8E6', // Light blue for new bookings
  },
  oldBooking: {
    backgroundColor: '#FFCDD2', // Default color for older bookings
  },
  reservationText: {
    fontSize: 18,
    color: colors.grey1,
    marginBottom: 5,
  },
  noReservationsText: {
    fontSize: 18,
    color: colors.grey1,
    textAlign: 'center',
    marginTop: 20,
  },
});
