import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import SearchComponent from '../components/SearchComponent';
import firebase from '../firebase'; 
import { colors } from '../global/Styles';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function SearchScreen({ navigation }) {
  const [parkingData, setParkingData] = useState([]);
  const [publicParkingData, setPublicParkingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parkingRef = firebase.database().ref('parkingData');
        const publicParkingRef = firebase.database().ref('PublicparkingData');

        parkingRef.on('value', (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const formattedData = Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }));
            setParkingData(formattedData);
          } else {
            setParkingData([]);
          }
        });

        publicParkingRef.on('value', (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const formattedData = Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }));
            setPublicParkingData(formattedData);
          } else {
            setPublicParkingData([]);
          }
          setLoading(false);
        });
      } catch (error) {
        console.error('Error fetching data: ', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color={colors.buttons} />;
  }

  return (
    <View style={{ flex: 1, marginBottom: 10 }}>
      <SearchComponent />
      <FlatList
        style={{ marginBottom: 1 }}
        data={parkingData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('SearchResultScreen', {
                parkName: item.ParkName,
              });
            }}>
            <View style={styles.imageView}>
              <ImageBackground
                style={styles.image}
                source={{ uri: item.images || 'https://via.placeholder.com/150' }}>
                <View style={styles.textView}>
                  <Text style={{ color: colors.cardbackground }}>
                    {item.ParkName}
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </TouchableWithoutFeedback>
        )}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        ListHeaderComponent={<Text style={styles.listHeader}>Parks</Text>}
        ListFooterComponent={<Footer navigation={navigation} data={publicParkingData} />}
      />
    </View>
  );
}

const Footer = ({ navigation, data }) => {
  return (
    <View style={{ marginTop: 10, marginBottom: 20, paddingTop: 20 }}>
      <FlatList
        style={{ marginBottom: 10 }}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('SearchResultScreen', {
                parkName: item.ParkName,
              });
            }}>
            <View style={styles.imageView}>
              <ImageBackground
                style={styles.image}
                source={{ uri: item.images || 'https://via.placeholder.com/150' }}>
                <View style={styles.textView}>
                  <Text style={{ color: colors.cardbackground }}>
                    {item.ParkName}
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </TouchableWithoutFeedback>
        )}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        ListHeaderComponent={<Text style={styles.listHeader}>More Parks</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageView: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.4475,
    height: SCREEN_WIDTH * 0.4475,
    marginLeft: SCREEN_WIDTH * 0.035,
    marginBottom: SCREEN_WIDTH * 0.035,
  },
  image: {
    height: SCREEN_WIDTH * 0.4475,
    width: SCREEN_WIDTH * 0.4475,
    borderRadius: 10,
  },
  listHeader: {
    fontSize: 16,
    color: colors.grey4,
    paddingBottom: 10,
    marginLeft: 10,
  },
  textView: {
    height: SCREEN_WIDTH * 0.4475,
    width: SCREEN_WIDTH * 0.4475,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52,52,52,0.3)',
  },
});
