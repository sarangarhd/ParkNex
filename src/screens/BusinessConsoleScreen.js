import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import firebase from '../firebase'; // Adjust the path according to your project structure
import { colors } from '../global/Styles';

const BusinessConsoleScreen = ({ navigation }) => {
  const [parkData, setParkData] = useState([]);

  useEffect(() => {
    const fetchParkData = async () => {
      try {
        const ref = firebase.database().ref('/');
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
    try {
      const ref = firebase.database().ref(`/${id}`);
      await ref.set(true); // Update the status to 'true' (AVAILABLE)
      setParkData((prevData) =>
        prevData.map((slot) => (slot.id === id ? { ...slot, status: true } : slot))
      );
    } catch (error) {
      console.error('Error updating data: ', error);
    }
  };

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
        <Text style={styles.subHeader}>Booked Slots</Text>
        <View style={styles.parkingArea}>
          {parkData.filter(slot => !slot.status).map((slot) => (
            <View key={slot.id} style={styles.slotContainer}>
              <TouchableOpacity
                style={[
                  styles.slot,
                  styles.booked,
                ]}
                onPress={() => handlePress(slot.id)}
              >
                <Text style={styles.slotText}>{slot.id}</Text>
                <Text style={styles.statusText}>BOOKED</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default BusinessConsoleScreen; // Ensure this export statement is correct

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
});
