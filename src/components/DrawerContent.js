import React, {useState, useContext, useEffect} from 'react';
import auth from '@react-native-firebase/auth';

import {
  View,
  Text,
  Linking,
  Pressable,
  Image,
  Dimensions,
  Alert,
  Switch,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Avatar, Button, Icon} from 'react-native-elements';
import {colors} from '../global/Styles';
import { SignInContext } from '../context/authContext';

export default function DrawerContent(props) {
  const {dispatchSignedIn} = useContext(SignInContext)

  async function signOut() {
    
    try {
      auth().signOut().then(() => {console.log("USER SUCCESSFULLY SIGNED OUT")});
      dispatchSignedIn({type:"UPDATE_SIGN_IN",payload:{userToken:null}})
    } catch (err) {
      Alert.alert(err.code);
    }

  }


  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={{backgroundColor: colors.buttons}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              paddingLeft: 20,
              paddingVertical: 10,
            }}>
            <Avatar
              rounded
              avatarStyle={styles.avatar}
              size={75}
              source={{uri: 'https://www.w3schools.com/w3images/avatar2.png'}}
            />
            <View style={{marginLeft: 10}}>
              <Text
                style={{
                  fontSize: 20,
                  marginLeft: 10,
                  fontWeight: 'bold',
                  color: colors.cardbackground,
                }}>
                SARANGA
              </Text>
              <Text style={{color: colors.cardbackground, fontSize: 15}}>
                saranga@gmail.com
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              paddingBottom: 10,
            }}>
            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <View
                style={{
                  marginLeft: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: colors.cardbackground,
                  }}>
                  1
                </Text>
                <Text style={{fontSize: 14, color: colors.cardbackground}}>
                  My Vehicle
                </Text>
              </View>
            </View>

            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <View
                style={{
                  marginLeft: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: colors.cardbackground,
                  }}>
                  1
                </Text>
                <Text style={{fontSize: 14, color: colors.cardbackground}}>
                  Notifications
                </Text>
              </View>
            </View>
          </View>
        </View>

        <DrawerItemList {...props} />

        <DrawerItem
          label="Payment"
          icon={({color, size}) => (
            <Icon name="payment" color={color} size={size} />
          )}
        />

        <DrawerItem
          label="Prmotions"
          icon={({color, size}) => (
            <Icon name="local-offer" color={color} size={size} />
          )}
        />

        <DrawerItem
          label="Settings"
          icon={({color, size}) => (
            <Icon name="settings" color={color} size={size} />
          )}
        />

        <DrawerItem
          label="Help"
          icon={({color, size}) => (
            <Icon name="help" color={color} size={size} />
          )}
        />

        <View style={{borderTopWidth: 1, borderTopColor: colors.grey4}}>
          <Text style={styles.preferences}>Preferences</Text>

          <View style={styles.switchText}>
            <Text style={styles.darkthemeText}>Dark Theme</Text>

            <View style={{paddingRight:10}}>
                <Switch
                    trackColor={{false:'#767577', true: '#81b0ff'}}
                    thumbColor= '#f4f3f4'
                />
            </View>
          </View>

        </View>


      </DrawerContentScrollView>

      
      <DrawerItem
          label="Sign Out"
          icon={({color, size}) => (
            <Icon 
            name="logout" 
            color={color} 
            size={size} 
            
            />
          )}
          onPress={signOut}
        />
      


        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    borderWidth: 1,
    borderColor: colors.pageBackground,
  },
  preferences: {
    fontSize: 16,
    color: 'grey',
    paddingTop: 10,
    paddingLeft: 20,
  },
  switchText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 5,
  },
  darkthemeText: {
    fontSize: 16,
    color: 'grey',
    paddingLeft:0,
    fontWeight: 'bold',
  },
});
