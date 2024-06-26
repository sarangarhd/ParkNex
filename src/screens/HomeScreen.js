import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
  Image,
  Dimensions,
  StatusBar,
  PermissionsAndroid,
  Platform
} from 'react-native';
import HomeHeader from '../components/HomeHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../global/Styles';
import { filterData, parkingData as nearestParkingData } from '../global/Data';
import ParkCard from '../components/ParkCard';
import database from '@react-native-firebase/database';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import auth from '@react-native-firebase/auth';

const SCREEN_WIDTH = Dimensions.get('window').width;

// Initialize the Geocoder with your API key
Geocoder.init('AIzaSyBilxfymdS0aq0bhs2knaGLURzMG35fkLo'); 

export default function HomeScreen({ navigation }) {
  const [park, setPark] = useState(true);
  const [indexCheck, setIndexCheck] = useState('0');
  const [publicParkingData, setPublicParkingData] = useState([]);
  const [currentAddress, setCurrentAddress] = useState('Fetching location...');

  useEffect(() => {
    const fetchPublicParkingData = async () => {
      try {
        const ref = database().ref('/PublicparkingData');
        ref.on('value', snapshot => {
          const data = snapshot.val();
          if (data) {
            const formattedData = Object.keys(data).map(key => ({
              ...data[key],
              id: key,
            }));
            setPublicParkingData(formattedData);
          } else {
            setPublicParkingData([]);
          }
        });
      } catch (error) {
        console.error('Error fetching parking data: ', error);
      }
    };

    fetchPublicParkingData();
    requestLocationPermission();
    
    const intervalId = setInterval(() => {
      getLocation();
    }, 60000); // 60000 milliseconds = 1 minute

    return () => clearInterval(intervalId);
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'ParkNex Location Permission',
            message:
              'ParkNex needs access to your location ' +
              'so you can see nearby parking spots.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation();
        } else {
          console.warn('Location permission denied');
          setCurrentAddress('Location permission not granted');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      getLocation();
    }
  };

  const getLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('Full location data:', position);
        const { latitude, longitude } = position.coords;
        Geocoder.from(latitude, longitude)
          .then(json => {
            console.log('Geocoding response:', json);
            const address = json.results[0].formatted_address;
            setCurrentAddress(address);
            updateUserLocation(address);
          })
          .catch(error => console.warn(error));
      },
      (error) => {
        console.warn(error);
        setCurrentAddress('Location not available');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const updateUserLocation = async (address) => {
    const user = auth().currentUser;
    if (user) {
      const userId = user.uid;
      await database().ref(`users/${userId}`).update({
        currentLocation: address,
      });
      console.log('User location updated in database.');
    } else {
      console.warn('No user is signed in.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.grey2} barStyle="dark-content" />

      <HomeHeader navigation={navigation} />
      <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={true}>
        <View style={{ backgroundColor: colors.cardbackground, paddingBottom: 10 }}>
          <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <TouchableOpacity onPress={() => setPark(true)}>
              <View
                style={{
                  ...styles.parkButton,
                  backgroundColor: park ? colors.buttons : colors.grey3,
                }}>
                <Text style={{ ...styles.parkText }}>Park</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setPark(false);
                navigation.navigate('ParkMapScreen');
              }}>
              <View
                style={{
                  ...styles.parkButton,
                  backgroundColor: park ? colors.grey3 : colors.buttons,
                }}>
                <Text style={{ ...styles.parkText }}>Reserve Parking</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.filterView}>
          <View style={styles.addresView}>
            <View style={styles.map}>
              <Icon name="map-marker" color={colors.buttons} size={25} />
              <Text style={{ marginLeft: 5 }}>{currentAddress}</Text>
            </View>
            <View style={styles.clock}>
              <Text style={{ marginLeft: 5 }}>Now</Text>
            </View>
          </View>

          <View>
            <TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.headerTextView}>
          <Text style={styles.headerText}>Services</Text>
        </View>

        <View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={filterData}
            keyExtractor={item => item.id}
            extraData={indexCheck}
            renderItem={({ item, index }) => (
              <Pressable onPress={() => setIndexCheck(item.id)}>
                <View
                  style={
                    indexCheck === item.id ? { ...styles.smallCardSelected } : { ...styles.smallcard }
                  }>
                  <Image source={item.Image} style={{ width: 60, height: 60, borderRadius: 15 }} />
                  <View>
                    <Text
                      style={
                        indexCheck === item.id
                          ? { ...styles.smallCardTextSelected }
                          : { ...styles.smallCardText }
                      }>
                      {item.name}
                    </Text>
                  </View>
                </View>
              </Pressable>
            )}
          />
        </View>

        <View style={styles.headerTextView}>
          <Text style={styles.headerText}>Nearest parking</Text>
        </View>

        <View>
          <FlatList
            style={{ marginBottom: 10, marginTop: 10 }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={nearestParkingData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <ParkCard
                  ScreenWidth={SCREEN_WIDTH * 0.8}
                  images={item.images}
                  parkName={item.ParkName}
                  farAway={item.farAway}
                  parkAddress={item.ParkAddress}
                  averageReview={item.averageReview}
                  NumberOfReviews={item.NumberOfReviews}
                />
              </View>
            )}
          />
        </View>

        <View style={styles.headerTextView}>
          <Text style={styles.headerText}>Public parking</Text>
        </View>

        <View>
          <FlatList
            style={{ marginBottom: 10, marginTop: 10 }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={publicParkingData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <ParkCard
                  ScreenWidth={SCREEN_WIDTH * 0.8}
                  images={item.images}
                  parkName={item.ParkName}
                  farAway={item.farAway}
                  parkAddress={item.ParkAddress}
                  averageReview={item.averageReview}
                  NumberOfReviews={item.NumberOfReviews}
                />
              </View>
            )}
          />
        </View>
      </ScrollView>

      {park && (
        <View style={styles.floatButton}>
          <TouchableOpacity onPress={() => navigation.navigate('ParkMapScreen')}>
            <Icon name="map-marker" color={colors.buttons} size={32} />
            <Text>Map</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  parkButton: {
    paddingHorizontal: 20,
    borderRadius: 15,
    paddingVertical: 10,
  },
  parkText: {
    alignItems: 'center',
    fontSize: 16,
  },
  filterView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: 20,
    marginVertical: 15,
  },
  clock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: colors.cardbackground,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  map: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  addresView: {
    flexDirection: 'row',
    backgroundColor: colors.grey2,
    borderRadius: 15,
    paddingVertical: 5,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  headerText: {
    color: colors.grey,
    fontSize: 22,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  headerTextView: {
    backgroundColor: colors.grey2,
    paddingVertical: 2,
  },
  smallcard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.grey3,
    borderRadius: 30,
    padding: 5,
    width: 80,
    margin: 10,
    height: 100,
  },
  smallCardSelected: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.buttons,
    borderRadius: 30,
    padding: 5,
    width: 80,
    margin: 10,
    height: 100,
  },
  smallCardText: {
    fontWeight: 'bold',
    color: colors.grey,
  },
  smallCardTextSelected: {
    fontWeight: 'bold',
    color: colors.grey2,
  },
  floatButton: {
    position: 'absolute',
    bottom: 10,
    right: 15,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
  },
});
