import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors, parameters } from '../global/Styles';
import {withBadge} from 'react-native-elements';


const BellIconWithBadge = withBadge(0)(Icon);

export default function HomeHeader({ navigation}) {
  return (
    <View style={styles.header}>
        <View>
        <Icon 
        style={styles.bar} 
        name="bars" 
        onPress={() => {
          navigation.toggleDrawer();
        }}
        /></View>
      
      <View style={styles.titleContainer}>
        <Text style={styles.headerText}>ParkNex</Text>
      </View>
      <View><BellIconWithBadge style={styles.bell} name="bell" /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: colors.buttons,
    height: parameters.headerHeight,
    alignItems: "center",
    justifyContent: "space-between", // Align items and distribute space between them
    paddingHorizontal: 20,
  },
  headerText: {
    color: colors.headerText,
    fontSize: 27,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  bar: {
    fontSize: 30,
    color: "#fffc",
  },
  bell: {
    fontSize: 30,
    color: "#fffc",
  },
});
