import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import SignInWelcomeScreen from '../screens/authScreens/SignInWelcomeScreen';
import SigninScreen from '../screens/authScreens/SigninScreen';
import HomeScreen from '../screens/HomeScreen';
import RootClintTabs from './ClintTabs';
import ParkMapScreen from '../screens/ParkMapScreen';
import DrawerNavigator from './DrawerNavigator';
import SignUpScreen from '../screens/authScreens/SignUpScreen';

//authstack-------------------------------------

const Auth = createStackNavigator();

export default function AuthStack() {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.RevealFromBottomAndroid,
      }}>
      <Auth.Screen
        name="SignInWelcomeScreen"
        component={SignInWelcomeScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      {/* ------------------ */}
      <Auth.Screen
        name="SigninScreen"
        component={SigninScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      {/* ------------------ */}
      <Auth.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
     {/* -----------------cut ---24-23-22---------------- */}
    </Auth.Navigator>
  );
}
