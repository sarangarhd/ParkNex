// src/api/parkingApi.js

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

// Fetch parking slots
export const fetchParkingSlots = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'parkingSlots'));
    const parkingSlots = [];
    querySnapshot.forEach((doc) => {
      parkingSlots.push({ id: doc.id, ...doc.data() });
    });
    return parkingSlots;
  } catch (error) {
    console.error('Error fetching parking slots: ', error);
  }
};
