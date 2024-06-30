import React from 'react';
import { colors } from '../../global/Styles';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import { ParkData,specialData } from '../../global/Data';

const parkScreen = ({navigation,park,onPress}) => {
  // const handlePress = () => {
    //menuproductscreen
  // };


  return (
    <View style={styles.container}>
    <View>
      {ParkData.map((items) => 
      <View key={items.key} style={styles.view1}>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.view2}>
            <Icon name='car' type='material-community' color='orange'/>
            <Text style={styles.text1}>{items.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
      )}
    </View>
    {/* --------------------------------------------- */}

    <View>
      {specialData.map((items) => 
      <View key={items.key} style={styles.view1}>
        
          <View style={styles.view2}>
            <Text style={styles.text2}>{items.title}</Text>
          </View>
        
      </View>
      )}
    </View>

    {/* ----------------------------------------------- */}
  </View>
  )
}

export default parkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  view1: {paddingHorizontal: 10,
    fontSize: 28,

  },

  view2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 10,
    borderBottomColor: colors.grey5,
  },

  text1: {
    color: colors.grey3,
    fontSize: 24,
    fontWeight: 'bold',
  },
  text2: {
    color: colors.grey3,
    fontSize: 18,
    fontWeight: 'bold',
  },
});