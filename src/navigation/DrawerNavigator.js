import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RootClintTabs from './ClintTabs';
import { Icon } from 'react-native-elements';
import { colors } from '../global/Styles';
import BusinessConsoleScreen from '../screens/BusinessConsoleScreen';
import SettingsScreen from '../screens/SettingScreen';
import PaymentScreen from '../screens/PaymentScreen';
import PromotionsScreen from '../screens/PromotionsScreen';
import AboutScreen from '../screens/AboutScreen';
import DrawerContent from '../components/DrawerContent';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="RootClintTabs"
        component={RootClintTabs}
        options={{
          title: 'Home',
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon name="home" size={size} color={focused ? '#7cc' : 'grey'} />
          ),
        }}
      />
      <Drawer.Screen
        name="BusinessConsoleScreen"
        component={BusinessConsoleScreen}
        options={{
          title: 'Business Console',
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon name="business" size={size} color={focused ? '#7cc' : 'grey'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon name="settings" size={size} color={focused ? '#7cc' : 'grey'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          title: 'Payment',
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon name="payment" size={size} color={focused ? '#7cc' : 'grey'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Promotions"
        component={PromotionsScreen}
        options={{
          title: 'Promotions',
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon name="local-offer" size={size} color={focused ? '#7cc' : 'grey'} />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: 'About',
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon name="info" size={size} color={focused ? '#7cc' : 'grey'} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
