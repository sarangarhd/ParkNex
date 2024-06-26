import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
// import { Icon } from 'react-native-elements';
import {colors, parameters} from '../global/Styles';
import {Image} from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ParkCard({
  OnPresParkCard,
  parkName,
  parkAddress,
  parkDistance,
  parkImage,
  NumberOfReviews,
  Rating,
  farAway,
  averageReview,
  images,
  ScreenWidth,
  NumberOfSpaces,
}) {
  return (
    <TouchableOpacity>
      <View style={{...styles.cardView, width: ScreenWidth}}>
        <Image
          style={{...styles.image, width: ScreenWidth}}
          source={{uri: images}}
        />

        <View>
          <View>
            <Text style={styles.parkName}>{parkName}</Text>
          </View>

          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={styles.distance}>
              <Icon name="map-marker" color={colors.buttons} size={25} />
              <Text style={styles.min}>{farAway} Min</Text>
            </View>
            <View style={{flex: 9, flexDirection: 'row'}}>
              <Text style={styles.Address}>{parkAddress}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* ------------------------------------------------------- */}
      <View style={styles.review}>
        <Text style={styles.average}>{averageReview}</Text>
        <Text style={styles.NumberOfReviews}>{NumberOfReviews} reviews</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardView: {
    marginHorizontal: 10,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderWidth: 1,
    borderColor: colors.grey2,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  image: {
    // width: '100%',
    height: 150,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  parkName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.grey4,
    marginTop: 5,
    marginLeft: 10,
  },
  distance: {
    flex: 4,
    flexDirection: 'row',
    borderRightColor: colors.grey2,
    borderRightWidth: 1,
    paddingHorizontal: 5,
  },
  min: {
    fontSize: 15,
    color: colors.grey4,
    fontWeight: 'bold',
    marginTop: 5,
  },
  Address: {
    fontSize: 12,
    color: colors.grey4,
    fontWeight: 'bold',
    marginTop: 5,
  },
  review: {
    position: 'absolute',
    top: 0,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  average: {
    color: colors.grey4,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -3,
  },
  NumberOfReviews: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 0,
    marginBottom: 0,
  },
});
