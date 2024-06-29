import {StyleSheet, Text, View, Dimensions, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchResultCard from '../components/SearchResultCard';
import firebase from '../firebase';
import {colors} from '../global/Styles';

const SCREEN_WIDTH = Dimensions.get('window').width;

const SearchResultScreen = ({navigation, route}) => {
  const { parkName } = route.params;
  const [parkingData, setParkingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParkingData = async () => {
      try {
        const ref = firebase.database().ref('parkingData');
        ref.on('value', (snapshot) => {
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
          setLoading(false);
        });
      } catch (error) {
        console.error('Error fetching data: ', error);
        setLoading(false);
      }
    };

    fetchParkingData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.buttons} />
      ) : (
        <View>
          <FlatList
            style={{backgroundColor: colors.cardbackground}}
            data={parkingData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <SearchResultCard
                ScreenWidth={SCREEN_WIDTH}
                images={item.images || 'https://example.com/default-image.jpg'}
                averageReview={item.averageReview}
                NumberOfReviews={item.NumberOfReviews}
                farAway={item.farAway}
                parkName={item.ParkName}
                parkAddress={item.ParkAddress}
                parkDistance={item.parkDistance}
                parkFacilities={item.parkFacilities}
                OnPresParkCard={() => {
                  navigation.navigate('ParkHomeScreen', {
                    parkId: item.id,
                    park: item.ParkName,
                  });
                }}
              />
            )}
            ListHeaderComponent={
              <View>
                <Text style={styles.listHeader}>
                  {parkingData.length} Results for "{parkName}"
                </Text>
              </View>
            }
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

export default SearchResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  listHeader: {
    color: colors.grey1,
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: 'bold',
  },
});
