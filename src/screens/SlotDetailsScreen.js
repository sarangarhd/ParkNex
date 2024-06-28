import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import firebase from '../firebase';
import { colors } from '../global/Styles';

const SlotDetailsScreen = ({ route }) => {
  const { parkId } = route.params;
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(`Fetching slots for parkId: ${parkId}`); // Log parkId

    const fetchSlots = async () => {
      try {
        const slotsRef = firebase.database().ref(`parkingData/Park${parkId}/slots`);
        slotsRef.on('value', (snapshot) => {
          const data = snapshot.val();
          console.log('Fetched data:', data); // Log fetched data
          if (data) {
            const formattedData = Object.keys(data).map((key) => ({
              slotId: key,
              available: data[key],
            }));
            console.log('Formatted data:', formattedData); // Log formatted data
            setSlots(formattedData);
          } else {
            console.log('No data available'); // Log when no data is available
            setSlots([]);
          }
          setLoading(false);
        });
      } catch (error) {
        console.error('Error fetching slot data:', error);
        setLoading(false);
      }
    };

    fetchSlots();
  }, [parkId]);

  const renderItem = ({ item }) => (
    <View style={styles.slotContainer}>
      <Text style={styles.slotText}>Slot ID: {item.slotId}</Text>
      <Text style={styles.slotText}>Available: {item.available ? 'Yes' : 'No'}</Text>
      <TouchableOpacity 
        style={[styles.button, {backgroundColor: item.available ? colors.buttons : colors.grey3}]}
        disabled={!item.available}
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
      <Text style={styles.title}>Slot Details for Park {parkId}</Text>
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
