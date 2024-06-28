// import React from 'react'
// import { View,Text,StyleSheet } from 'react-native'

// export default function MyParkScreen() {
//   return (
//     <View style={{flex:1,alignItems:'center',justifyContent:'center'}}> 
//       <Text>My Park Screen</Text>
//     </View>
//   )
// }

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function MyParkScreen() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const fetchSlots = async () => {
      const slotsCollection = await firestore().collection('parkingSlots').get();
      setSlots(slotsCollection.docs.map(doc => doc.data()));
    };

    fetchSlots();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Park Slots</Text>
      <FlatList
        data={slots}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.slotCard}>
            <Text style={styles.text}>Park Name: {item.parkName}</Text>
            <Text style={styles.text}>Available Slots: {item.availableSlots}</Text>
            <Text style={styles.text}>Total Slots: {item.totalSlots}</Text>
            <Text style={styles.text}>Location: {item.location}</Text>
            <Text style={styles.text}>Rate Per Hour: ${item.ratePerHour}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  slotCard: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
  },
});
