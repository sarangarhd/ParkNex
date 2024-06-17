import {StyleSheet, Text, View, Dimensions, FlatList} from 'react-native';
import React from 'react';
import SearchResultCard from '../components/SearchResultCard';
import {parkingData} from '../global/Data';
import {colors} from '../global/Styles';
import {parkFacilityData} from '../global/Data';


const SCREEN_WIDTH = Dimensions.get('window').width;

const SearchResultScreen = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      

      <View>
        <FlatList
          style={{backgroundColor: colors.cardbackground}}
          
          data={parkingData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <SearchResultCard
              ScreenWidth={SCREEN_WIDTH}
              images={item.images}
              averageReview={item.averageReview}
              NumberOfReviews={item.NumberOfReviews}
              farAway={item.farAway}
              parkName={item.ParkName}
              parkAddress={item.ParkAddress}
              parkDistance={item.parkDistance}
              parkFacilities={item.parkFacilities}
              OnPresParkCard={()=>{navigation.navigate("ParkHomeScreen",{id:index,park:item.ParkName})}}
              
            />
          )}
          ListHeaderComponent={
            <View>
              <Text style={styles.listHeader}>
                {parkingData.length} Result for {route.params.item}
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          
          
        />
      </View>
      
    </View>
  )
};

export default SearchResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20,
    
  },

  listHeader: {
    color: colors.grey1,
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: 'bold',
  },
});
