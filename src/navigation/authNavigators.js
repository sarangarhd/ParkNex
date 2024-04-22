import React from 'react';
import {createStackNavigator, TransitionPresets} from "@react-navigation/stack";
import SignInWelcomeScreen from "../screens/authScreens/SignInWelcomeScreen";
import SigninScreen from "../screens/authScreens/SigninScreen";
import HomeScreen from '../screens/HomeScreen';





const Auth = createStackNavigator();

export default function AuthStack() {
  return (
    <Auth.Navigator
    screenOptions={{
      headerShown:false,
      gestureEnabled:true,
      ...TransitionPresets.RevealFromBottomAndroid
    }}
    >
      <Auth.Screen name="SignInWelcomeScreen" component={SignInWelcomeScreen}/>
      <Auth.Screen name="SigninScreen" component={SigninScreen}/>
      <Auth.Screen name="HomeScreen" component={HomeScreen}/>
    </Auth.Navigator>
  )
}
