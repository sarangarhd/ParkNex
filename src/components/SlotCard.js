
// ParkScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const initialParkData = [
  { id: 'A-1', status: 'BOOKED' },
  { id: 'A-2', status: 'BOOKED' },
  { id: 'A-3', status: 'BOOKED' },
  { id: 'A-4', status: 'AVAILABLE' },
  { id: 'A-5', status: 'BOOKED' },
  { id: 'A-6', status: 'BOOKED' },
  { id: 'A-7', status: 'BOOKED' },
  { id: 'A-8', status: 'BOOKED' },
];

const ParkScreen = ({ navigation }) => {
  const [parkData, setParkData] = useState(initialParkData);

  const handlePress = (id) => {
    const updatedParkData = parkData.map((slot) =>
      slot.id === id ? { ...slot, status: 'BOOKED' } : slot
    );
    setParkData(updatedParkData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Parking Slots</Text>
      <Text style={styles.subHeader}>1st Floor</Text>
      <View style={styles.parkingArea}>
        {parkData.map((slot) => (
          <View key={slot.id} style={styles.slotContainer}>
            <TouchableOpacity
              style={[
                styles.slot,
                slot.status === 'BOOKED' ? styles.booked : styles.available,
              ]}
              onPress={() => slot.status === 'AVAILABLE' && handlePress(slot.id)}
              disabled={slot.status === 'BOOKED'}
            >
              <Text style={styles.slotText}>{slot.id}</Text>
              <Text style={styles.statusText}>{slot.status}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ParkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
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
});





























// //menu card create----

// import React from 'react';
// import {Text,View,Image,StyleSheet} from 'react-native';
// import { colors } from '../global/Styles';







// export default function SlotCard({ParkName,parkFacilities,ParkAddress,images}) {
//   return (
//     <View style ={styles.view1}>
//     <View style ={styles.view2}>
//         <View style ={styles.view3}>
//             <Text style ={styles.text1}>{ParkName}</Text>
//             <View>
//                 <Text style ={styles.text2}>{parkFacilities}</Text>
//             </View>
//             <Text style = {styles.text3}> {ParkAddress}</Text>
//         </View>
//         <View style ={{flex:2}}>
//              <Image style ={styles.image} source ={{uri:images}} />
//         </View>
//     </View>
// </View>
//   )
// }
















// const styles =StyleSheet.create({

//     view1:{backgroundColor:"white",
//             elevation:4,
//             shadowOpacity:0.4,
//             shadowColor:"black",
//             margin:5,
//             padding:10
// },

// view2: {flex:1,
//         flexDirection:"row",
//         padding:0,
//         justifyContent:"space-between"
// },

// view3 :{flex:6,
//         justifyContent:"space-between"
//         },

// text1: {
//     fontSize:15,
//     color:colors.grey1,
//     fontWeight:"bold"
//     },

//     text2:{
//         fontSize:15,
//         color:colors.grey3,
//         marginRight:2
//      },

// text3:{
//     fontSize:15,
//     color:colors.black,
//     },

// image:{flex:1
//     }
// })