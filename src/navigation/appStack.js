import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import ParkMapScreen from '../screens/ParkMapScreen';
import DrawerNavigator from './DrawerNavigator';
import PaymentProcessScreen from '../screens/PaymentProcessScreen';

const App = createStackNavigator();

export function AppStack() {
  return (
    <App.Navigator>
      <App.Screen
        name="App"
        component={DrawerNavigator}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <App.Screen
        name="ParkMapScreen"
        component={ParkMapScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      {/* addd payment process screen ------------------------------ */}
      <App.Screen
        name="PaymentProcessScreen"
        component={PaymentProcessScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
        />


    </App.Navigator>
  );
}