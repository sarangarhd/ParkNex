import React, {useState, useRef, useEffect,useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from '../../components/Header';
import {colors, title, parameters} from '../../global/Styles';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import {create} from 'react-test-renderer';
import Swiper from 'react-native-swiper';
import {SignInContext} from '../../context/authContext';
import auth from '@react-native-firebase/auth';

export default function SignInWelcomeScreen({navigation}) {


  const {dispatchSignedIn} = useContext(SignInContext);
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        dispatchSignedIn({
          type: 'UPDATE_SIGN_IN',
          payload: {userToken: 'signed-in'},
        });
      } else {
        dispatchSignedIn({type: 'UPDATE_SIGN_IN', payload: {userToken: null}});
      }
    });
  }, []);


  return (
    <View style={{flex: 1}}>
      {/* // marginTop:getStatusBarHeight(), */}
      <View
        style={{
          flex: 3,
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: 20,
        }}>
        <Text style={{fontSize: 26, color: colors.buttons, fontWeight: 'bold'}}>
          DISCOVER PARKINGS{' '}
        </Text>
        <Text style={{fontSize: 26, color: colors.buttons, fontWeight: 'bold'}}>
          IN YOUR AREA
        </Text>
      </View>

      <View style={{flex: 4, justifyContent: 'center'}}>
        <Swiper style={styles.wrapper} showsButtons={false} autoplay={true}>
          <View style={styles.slide1}>
            {/* <Text style={styles.text}>Hello Swiper</Text> */}
            <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTovMxXoVkosV-u_KgfeVpvgXBMk_O8HWvczg&usqp=CAU',
              }}
              style={{height: '100%', width: '100%'}}
            />
          </View>

          <View style={styles.slide2}>
            {/* <Text style={styles.text}>Beautiful</Text> */}
            <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjbV9X4vrpFnkeyOqp2wBfS9GQGRAjaNVbGw&usqp=CAU',
              }}
              style={{height: '100%', width: '100%'}}
            />
          </View>

          <View style={styles.slide3}>
            {/* <Text style={styles.text}>And simple</Text> */}
            <Image
              source={{
                uri: 'https://png.pngtree.com/png-vector/20221117/ourmid/pngtree-car-parking-sign-png-image_6463117.png',
              }}
              style={{height: '100%', width: '100%'}}
            />
          </View>
        </Swiper>
      </View>

      <View style={{flex: 4, justifyContent: 'flex-end', marginBottom: '15%'}}>
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <Button
            title="SIGN IN"
            style={parameters.styledButton}
            titleStyle={styles.buttonTitle}
            onPress={() => {
              navigation.navigate('SigninScreen');
            }}
          />
        </View>
        {/* ---------- */}

        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <Button
            title="Create an Account"
            buttonStyle={styles.createButton}
            titleStyle={styles.createButtonTitle}
            onPress={() => {
              navigation.navigate('SignUpScreen');
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    // backgroundColor:'#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'#92BBD9'
  },
  createButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.buttons,
    height: 10,
    paddingHorizontal: 20,
  },
  createButtonTitle: {
    color: colors.buttons,
    fontSize: 15,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },
});
