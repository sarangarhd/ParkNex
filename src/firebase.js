import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import '@react-native-firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDY95JtRSDQjO9c5vtogt2cVLxUuNhFiR4",
  authDomain: "parknex-144f8.firebaseapp.com",
  databaseURL: "https://parknex-144f8-default-rtdb.firebaseio.com",
  projectId: "parknex-144f8",
  storageBucket: "parknex-144f8.appspot.com",
  messagingSenderId: "332883852347",
  appId: "1:332883852347:android:094f37f7d0ec1e4d52f01e"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
















// // src/firebase.js

// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyDY95JtRSDQjO9c5vtogt2cVLxUuNhFiR4",
//   authDomain: "parknex-144f8.firebaseapp.com",
//   databaseURL: "https://parknex-144f8-default-rtdb.firebaseio.com",
//   projectId: "parknex-144f8",
//   storageBucket: "parknex-144f8.appspot.com",
//   messagingSenderId: "332883852347",
//   appId: "1:332883852347:android:094f37f7d0ec1e4d52f01e"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// export { db };

