import {StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
import ParkHomeScreen from '../screens/ParkHomeScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import SlotDetailsScreen from '../screens/SlotDetailsScreen';
import SlotScreen from '../screens/SlotScreen';

const Client = createStackNavigator();

export function ClientStack({navigation, route}) {
  useLayoutEffect(() => {
    //this is for, go to park visible tab bar option line------------not work, check this----------------
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'ParkHomeScreen' || 'ParkScreen') {
      navigation.setOptions({tabBarVisible: false});
    } else {
      navigation.setOptions({tabBarVisible: true});
    }
  }, [navigation, route]);

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

      <Client.Screen
        name="SlotDetailsScreen"
        component={SlotDetailsScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      

      <Client.Screen //slot screen--------------------
        name="SlotScreen"        //prefer this one-----
        component={SlotScreen}
        options={() => ({
          headerShown: false,
        })}
      />
    </Client.Navigator>
  );
}

// const styles = StyleSheet.create({})
