import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RootClintTabs from './ClintTabs';
import { Icon } from 'react-native-elements';
import { colors } from '../global/Styles'; 


const Drawer = createDrawerNavigator();



export default function DrawerNavigator() {
  return (
    
        <Drawer.Navigator>
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
                    color={focussed ? '#7cc' : colors.grey2} 
                    />
                )
            }}

            />
        </Drawer.Navigator>
  )
}
