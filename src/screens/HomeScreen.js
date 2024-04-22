import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeHeader from '../components/HomeHeader';

import {colors, parameters} from '../global/Styles';

export default function HomeScreen() {
  // think of park as a state................

  const [park, setPark] = useState(true);

  return (
    <View style={styles.container}>
      <HomeHeader />
      <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={true}>
        <View>
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

        {/* ----------------------------- */}

        <View>
          <View style={{flexDirection: 'row'}}>
            <Icon name="map-marker" color={colors.buttons} size={25} />
            <Text style={{marginLeft: 5}}>Map</Text>
          </View>
          {/* -- */}
          <View style={{flexDirection: 'row'}}>
            <Icon name="clock-time-four" color={colors.buttons} size={25} />
            <Text style={{marginLeft: 5}}>Now</Text>
          </View>
        </View>

        {/* ----------------------------- */}
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
});
