import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

const NotificationListener = ({ children }) => {
  useEffect(() => {
    // Background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    // Foreground handler
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const { title, body   } = remoteMessage.notification;
      
      Alert.alert('Alert From ParkNex!', `${title}\n${body}\n`);
    });

    return unsubscribe;
  }, []);

  return children;
};

export default NotificationListener;
