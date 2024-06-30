import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import Header from './src/components/Header';
import {colors} from './src/global/Styles';
// import SigninScreen from "./src/screens/authScreens/SigninScreen";
// import SignInWelcomeScreen from "./src/screens/authScreens/SignInWelcomeScreen";
import  {NavigationContainer} from '@react-navigation/native';

import RootNavigator from './src/navigation/RootNavigator';
import {SignInContextProvider} from './src/context/authContext';
import {ThemeProvider} from './src/context/ThemeContext';
import DrawerNavigator from './src/navigation/DrawerNavigator';

export default function App() {
  return (
    <SignInContextProvider>
       
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.statusbar}
        />
        {/* <SigninScreen/> */}
        {/* <SignInWelcomeScreen/> */}
        <RootNavigator />
      </View>
      
    </SignInContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});