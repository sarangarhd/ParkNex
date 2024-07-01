import React, { useEffect } from 'react';
import {View, Text, StyleSheet, StatusBar,Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { colors } from './src/global/Styles';
import RootNavigator from './src/navigation/RootNavigator';
import { SignInContextProvider } from './src/context/authContext';
import { ThemeProvider } from './src/context/ThemeContext';
import NotificationListener from './src/NotificationListener';

export default function App() {
  useEffect(() => {
    requestUserPermission();
    getToken();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      //Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  const getToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('FCM Token:', fcmToken);
      // Save the token to your backend server if needed
    } else {
      console.log('Failed to get FCM token');
    }
  };

  return (
    <SignInContextProvider>
      <ThemeProvider>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor={colors.statusbar} />
          <NotificationListener>
            <RootNavigator />
          </NotificationListener>
        </View>
      </ThemeProvider>
    </SignInContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
