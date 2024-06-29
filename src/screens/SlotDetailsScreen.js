import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import firebase from '../firebase';
import { colors } from '../global/Styles';

const SlotDetailsScreen = ({ route }) => {
  const { parkId } = route.params;
  const [slots, setSlots] = useState([]);
  const [parkName, setParkName] = useState('');
  const [loading, setLoading] = useState(true);

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
