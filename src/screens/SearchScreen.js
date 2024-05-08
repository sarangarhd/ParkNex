import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions,
} from 'react-native';
import SearchComponent from '../components/SearchComponent';
import {parkingData} from '../global/Data';
import {colors} from '../global/Styles';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function SearchScreen() {
  return (
    <View style={{flex:1,marginBottom:10}}>
      <SearchComponent />
      <View>
        <FlatList
          style={{marginBottom: 1}}
          data={parkingData}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableWithoutFeedback>
              <View style={styles.imageView}>
                <ImageBackground
                  style={styles.image}
                  source={{uri: item.images}}>
                  <View style={styles.textView}>
                    <Text style={{color: colors.cardbackground}}>
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
          ListHeaderComponent={<Text style={styles.listHeder}>Parks</Text>}
          ListFooterComponent={<Footer />}
        />
      </View>
    </View>
  );
}

const Footer = () => {
  return (
    <View style={{marginTop: 10,marginBottom: 20}}>
      <View style={{}}>
        <FlatList
          style={{marginBottom: 10}}
          data={parkingData}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableWithoutFeedback>
              <View style={styles.imageView}>
                <ImageBackground
                  style={styles.image}
                  source={{uri: item.images}}>
                  <View style={styles.textView}>
                    <Text style={{color: colors.cardbackground}}>
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
          ListHeaderComponent={<Text style={styles.listHeder}>More Parks</Text>}
        />
      </View>
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
  listHeder: {
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
