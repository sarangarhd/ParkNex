import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
  Touchable,
} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';
import {colors} from '../global/Styles';
import FacilityCard from './FacilityCard';
import {parkFacilityData } from '../global/Data';

const SearchResultCard = ({
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

  
}) => {
  return (
    <View>
     <TouchableOpacity onPress={OnPresParkCard} >
      <View style={styles.view1}>
        <View style={{height: 150}}>
          <ImageBackground
            style={{height: 160}}
            source={{uri: images}}
            imageStyle={styles.imageStyle}
          />

          <View style={styles.image}>
            <Text style={styles.text1}>{averageReview}</Text>
            <Text style={styles.text2}> {NumberOfReviews} reviews</Text>
          </View>
        </View>

        <View style={styles.view3}>
          <View style={{paddingTop: 5}}>
            <Text style={styles.text5}>{parkName}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={styles.view4}>
              <Icon
                name="location-pin"
                color="black"
                size={18}
                iconStyle={{marginTop: 5}}
              />
              <Text style={styles.view5}>{farAway}Min</Text>
            </View>
            <View style={{flex:9}}>
              <Text style={styles.text6}>{parkAddress}</Text>
            </View>
          </View>
        </View>
      </View>

      </TouchableOpacity>

      <View style={{marginTop:5,paddingBottom:20}}>
        <FlatList
          style={{backgroundColor:colors.cardbackground}}
          data={parkFacilityData}
          keyExtractor={(item,index) => index.toString()}
          renderItem={({item,index}) => (
            <FacilityCard
              images={item.image}
              ParkName={item.name}
            />
          )}
          horizontal={true}
        />
      </View>

      

    </View>
  );
};

export default SearchResultCard;

const styles = StyleSheet.create({
  view1: {
    marginHorizontal: 9,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    flex: 1,
  },

  image: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(52, 52, 52,0.4)',
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 12,
  },

  imageStyle: {borderTopLeftRadius: 5, borderTopRightRadius: 5},

  text1: {color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: -3},

  text2: {color: 'white', fontSize: 13, marginRight: 0, marginLeft: 0},

  view2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -5,
  },
  text3: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.grey2,
  },

  text4: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.grey2,
  },
  view3: {
    flexDirection: 'column',
    marginHorizontal: 5,
    marginBottom: 10,
    marginLeft: 0,
    marginTop: 5,
  },

  text5: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.grey1,
  },

  view4: {
    flex: 4,
    flexDirection: 'row',
    borderRightWidth: 1,
    borderRightColor: colors.grey4,
    paddingHorizontal: 5,
  },

  view5: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingTop: 5,
    color: 'grey',
  },

  text6: {
    fontSize: 12,
    paddingTop: 5,
    color: 'grey',
    paddingHorizontal: 10,
  },
});
