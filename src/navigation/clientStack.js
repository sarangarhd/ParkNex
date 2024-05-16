import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
import ParkHomeScreen from '../screens/ParkHomeScreen';

const Client = createStackNavigator();

export function ClientStack() {
  return (
    <Client.Navigator>
      <Client.Screen
        name="Searchh"
        component={SearchScreen}
        options={() => ({
          headerShown: false,
        })}
      />

      <Client.Screen
        name="SearchResultScreen"
        component={SearchResultScreen}
        options={() => ({
          headerShown: false,
        })}
      />

      <Client.Screen
        name="ParkHomeScreen"
        component={ParkHomeScreen}
        options={() => ({
          headerShown: false,
        })}
      />
    </Client.Navigator>
  );
}

// const styles = StyleSheet.create({})
