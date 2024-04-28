import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import SignInWelcomeScreen from '../screens/authScreens/SignInWelcomeScreen';
import SigninScreen from '../screens/authScreens/SigninScreen';
import HomeScreen from '../screens/HomeScreen';
import RootClintTabs from './ClintTabs';

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
        name="RootClintTabs"
        component={RootClintTabs}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      {/* ------------------ */}
    </Auth.Navigator>
  );
}
