import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import MyParkScreen from '../screens/MyParkScreen';
import MyAccountScreen from '../screens/MyAccountScreen';
import {colors, parameters} from '../global/Styles';
import ParkMapScreen from '../screens/ParkMapScreen';
import { ClientStack } from './clientStack';

const clientTabs = createBottomTabNavigator();

export default function RootClintTabs() {
  return (
    <clientTabs.Navigator
      tabBarOptions={{
        activeTintColor: colors.buttons,
        inactiveTintColor: colors.grey3,
        showLabel: true,
        // removed some code section, to keep the code snippet short
      }}>
      <clientTabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <clientTabs.Screen
        name="Search"
        component={ClientStack}
        options={{
          tabBarLabel: 'Search',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="search" color={color} size={size} />
          ),
        }}
      />
      <clientTabs.Screen
        name="MyPark"
        component={MyParkScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'My Park',

          tabBarIcon: ({color, size}) => (
            <Icon name="local-parking" color={color} size={size} />
          ),
        }}
      />
      <clientTabs.Screen
        name="MyAccount"
        component={MyAccountScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'My Account',
          tabBarIcon: ({color, size}) => (
            <Icon name="account-circle" color={color} size={size} />
          ),
        }}
      />


    </clientTabs.Navigator>
  );
}
