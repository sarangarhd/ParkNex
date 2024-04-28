import React, {useState} from 'react';
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
} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import HomeHeader from '../components/HomeHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors, parameters} from '../global/Styles';
import {filterData, parkingData} from '../global/Data';
import ParkCard from '../components/ParkCard';


const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HomeScreen() {
  // think of park as a state................

  const [park, setPark] = useState(true);
  const [indexCheck, setIndexCheck] = useState('0');

  return (
    <View style={styles.container}>
      <HomeHeader />
      <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={true}>
        <View style={{backgroundColor:colors.cardbackground,paddingBottom:10}}>
          <View
            style={{
              marginTop: 15,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity onPress={() => setPark(true)}>
              <View
                style={{
                  ...styles.parkButton,
                  backgroundColor: park ? colors.buttons : colors.grey3,
                }}>
                <Text style={{...styles.parkText}}>Park</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setPark(false)}>
              <View
                style={{
                  ...styles.parkButton,
                  backgroundColor: park ? colors.grey3 : colors.buttons,
                }}>
                <Text style={{...styles.parkText}}>Find Park</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* --------------start filter view--------------- */}
        <View style={styles.filterView}>
          <View style={styles.addresView}>
            <View style={styles.map}>
              <Icon name="map-marker" color={colors.buttons} size={25} />
              <Text style={{marginLeft: 5}}>No:27,Colombo-01</Text>
            </View>
            {/* -- */}
            <View style={styles.clock}>
              <Icon name="clock-o" color={colors.buttons} size={25} />
              <Text style={{marginLeft: 5}}>Now</Text>
            </View>
          </View>

          <View>
            <TouchableOpacity>
              <Icon
                name="cogs"
                color={colors.buttons}
                type={'font-awesome'}
                size={25}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* ----------------------------- */}
        <View style={styles.headerTextView}>
          <Text style={styles.headerText}>Services</Text>
        </View>
        {/* --------------------------------------- */}
        <View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={filterData}
            keyExtractor={item => item.id}
            extraData={indexCheck}
            renderItem={({item, index}) => (
              <Pressable
                onPress={() => {
                  setIndexCheck(item.id);
                }}>
                <View
                  style={
                    indexCheck === item.id
                      ? {...styles.smallCardSelected}
                      : {...styles.smallcard}
                  }>
                  <Image
                    source={item.Image}
                    style={{width: 60, height: 60, borderRadius: 15}}
                  />

                  <View>
                    <Text
                      style={
                        indexCheck === item.id
                          ? {...styles.smallCardTextSelected}
                          : {...styles.smallCardText}
                      }>
                      {item.name}
                    </Text>
                  </View>
                </View>
              </Pressable>
            )}
          />
        </View>
        {/* ------------------ */}

        {/* -=-change the order folloing, after make home page--- */}
        <View style={styles.headerTextView}>
          <Text style={styles.headerText}>Nearest parking</Text>
        </View>
        {/* --------------------------------- */}
        <View>
          <FlatList
            style={{marginBottom: 10, marginTop: 10}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={parkingData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
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
        {/* ------------------------------- */}

        <View style={styles.headerTextView}>
          <Text style={styles.headerText}>Nearest parking</Text>
        </View>

        {/* ------------------------------- */}
        <View>
          <FlatList
            style={{marginBottom: 10, marginTop: 10}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={parkingData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
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
        {/* ------------------------------------------- */}

        <View style={styles.headerTextView}>
          <Text style={styles.headerText}>Parks in Your Area</Text>
        </View>

        {/* ------------------------------------------- */}

        {/* <View style={{width: SCREEN_WIDTH, paddingTop: 10}}>
  {
    parkingData.map(item => (
      <View key={item.id} style={{paddingBottom: 20}}>
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
    ))
  }
</View> */}

        {/* <View>
          <FlatList
            style={{marginBottom: 10, marginTop: 10}}
            // horizontal={true}
            //
            showsHorizontalScrollIndicator={false}
            data={parkingData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
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
        </View> */}

        {/* ------------------------------------------- */}

        {/* <View style={{width: SCREEN_WIDTH, paddingTop: 10}}>
          {parkingData.map(item => (
            <View key={item.id} style={{paddingBottom: 20}}>
              <ParkCard
                ScreenWidth={SCREEN_WIDTH * 0.95}
                images={item.images}
                parkName={item.ParkName}
                farAway={item.farAway}
                parkAddress={item.ParkAddress}
                averageReview={item.averageReview}
                NumberOfReviews={item.NumberOfReviews}
              />
            </View>
          ))}
        </View> */}

        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  parkButton: {
    paddingHorizontal: 20,
    borderRadius: 15,
    paddingVertical: 10,
  },
  parkText: {
    alignItems: 'center',
    // marginLeft:5,
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
});
