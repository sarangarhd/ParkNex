import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RootClintTabs from './ClintTabs';
import { Icon } from 'react-native-elements';
import { colors } from '../global/Styles'; 
import BusinessConsoleScreen from '../screens/BusinessConsoleScreen';
import DrawerContent from '../components/DrawerContent';


const Drawer = createDrawerNavigator();



export default function DrawerNavigator() {
  return (
    
        <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}
        
        >




            <Drawer.Screen
            name='RootClintTabs'
            component={RootClintTabs}
            options={{
                title: 'Home',
                headerShown: false,
                drawerIcon: ({focussed, size}) => (
                    <Icon 
                    name='home' 
                    size={size} 
                    color={focussed ? '#7cc' : 'grey'} 
                    />
                )
            }}
            />
            {/* ----------------- */}
            
            <Drawer.Screen
            name='BusinessConsoleScreen'
            component={BusinessConsoleScreen}
            options={{
                title: 'Business Console',
                headerShown: false,
                drawerIcon: ({focussed, size}) => (
                    <Icon 
                    name='business' 
                    size={size} 
                    color={focussed ? '#7cc' : 'grey'} 
                    // color changed colors.grey2 =>greay--------------------  
                    />
                )
            }}
            />

            {/* ------------------ */}
        </Drawer.Navigator>
  )
}
