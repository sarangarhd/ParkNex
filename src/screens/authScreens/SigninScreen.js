import React, {useState, useRef, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Header from '../../components/Header';
import {colors, title, parameters} from '../../global/Styles';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import {SignInContext} from '../../context/authContext';

export default function SigninScreen({navigation}) {
  const {dispatchSignedIn} = useContext(SignInContext);
  const [textinput2Fossued, setTextinput2Fossued] = useState(false);
  const textinput1 = useRef(1);
  const textinput2 = useRef(2);

  async function signIn(data) {
    try {
      const {password, email} = data;
      const user = await auth().signInWithEmailAndPassword(email, password);
      if (user) {
        dispatchSignedIn({type: "UPDATE_SIGN_IN", payload: {userToken: "signed-in"}});
        console.log(user);
      }
    } catch (error) {
      Alert.alert(
        error.name,
        error.message
      );
    }
  }

  return (
    <View style={styles.container}>
      <Header
        title={'MY ACCOUNT'}
        type={'arrow-left'}
        navigation={navigation}
      />

      <View style={{marginLeft: 20}}>
        <Text style={title}>Sign-In</Text>
      </View>

      <View style={{alignItems: 'center', marginTop: 10}}>
        <Text style={styles.text1}>Please enter your email and password</Text>
        <Text style={styles.text1}>registered with your account</Text>
      </View>

      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={(values) => {
          signIn(values);
        }}
      >
        {(props) =>
          <View>
            <View style={{marginTop: 10}}>
              <View>
                <TextInput
                  style={styles.textinput1}
                  placeholder="Email"
                  ref={textinput1}
                  onChangeText={props.handleChange('email')}
                  value={props.values.email}
                />
              </View>

              <View style={styles.textinput2}>
                <Animatable.View
                  animation={textinput2Fossued ? '' : 'fadeInLeft'}
                  duration={400}>
                  <Icon
                    name="lock"
                    style={{fontSize: 20, color: '#86939e'}}
                  />
                </Animatable.View>
                <TextInput
                  style={{width: '80%'}}
                  placeholder="Password"
                  ref={textinput2}
                  onFocus={() => {
                    setTextinput2Fossued(false);
                  }}
                  onBlur={() => {
                    setTextinput2Fossued(true);
                  }}
                  onChangeText={props.handleChange('password')}
                  value={props.values.password}
                />
                <Animatable.View
                  animation={textinput2Fossued ? '' : 'fadeInLeft'}
                  duration={400}>
                  <Icon
                    name="eye-slash"
                    style={{fontSize: 20, color: '#86939e', marginRight: 10}}
                  />
                </Animatable.View>
              </View>
            </View>

            <View style={{marginHorizontal: 20, marginTop: 20}}>
              <Button
                title="SIGN IN"
                style={parameters.styledButton}
                titleStyle={styles.buttonTitle}
                onPress={props.handleSubmit}
              />
            </View>
          </View>
        }
      </Formik>

      <View style={{alignItems: 'center', marginTop: 10}}>
        <Text style={{...styles.text1, textDecorationLine: 'underline'}}>
          Forgot Password?
        </Text>
      </View>

      <View style={{alignItems: 'center', marginTop: 20}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>OR</Text>
      </View>

      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
        <TouchableOpacity
          style={[styles.iconContainer, {borderColor: '#3b5998'}]}
          onPress={() => {
            // Handle Facebook sign in action
          }}>
          <Icon name="facebook" style={styles.icon1} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.iconContainer,
            {borderColor: '#dd4b39', marginLeft: 20},
          ]}
          onPress={() => {
            // Handle Google sign in action
          }}>
          <Icon name="google" style={styles.icon2} />
        </TouchableOpacity>
      </View>

      <View style={{alignItems: 'center', marginTop: 10}}>
        <Text style={{...styles.text1, textDecorationLine: 'underline'}}>
          New to ParkNex?
        </Text>
      </View>

      <View style={{marginHorizontal: 20, marginTop: 20}}>
        <Button
          title="Create an Account"
          buttonStyle={styles.createButton}
          titleStyle={styles.createButtonTitle}
          onPress={() => {navigation.navigate('SignUpScreen')}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
    borderWidth: 2,
    borderRadius: 25,
    padding: 10,
  },
  icon1: {
    fontSize: 30,
    color: 'blue',
  },
  icon2: {
    fontSize: 30,
    color: 'orange',
  },
  text1: {
    color: colors.grey3,
    fontSize: 15,
  },
  textinput1: {
    borderWidth: 1,
    borderColor: '#86939e',
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    paddingLeft: 15,
  },
  textinput2: {
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 20,
    borderColor: '#86939e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingLeft: 15,
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
