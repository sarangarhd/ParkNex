import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useState} from 'react';
import Route1, {Route2, Route3, Route4} from './FindPlace';
import {TabView, TabBar} from 'react-native-tab-view';
import {colors} from '../global/Styles';
import {Icon} from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

const SlotDetailsScreen = ({navigation, route}) => {
  const [routes] = useState([
    {key: '1', title: 'Route 1'},
    {key: '2', title: 'Route 2'},
    {key: '3', title: 'Route 3'},
    {key: '4', title: 'Route 4'},
  ]);
  const [index, setIndex] = useState(0);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: colors.cardbackground}}
      tabStyle={styles.tabStyle}
      scrollEnabled={true}
      style={styles.tab}
      labelStyle={styles.tabLabel}
      contentContainerStyle={styles.tabContainer}
    />
  );

  const renderScene = ({route}) => {
    switch (route.key) {
      case '1':
        return <Route1 />;
      case '2':
        return <Route2 />;
      case '3':
        return <Route3 />;
      case '4':
        return <Route4 />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.view1}>
        <Icon
          name="arrow-back"
          type="ionicon"
          color={colors.black}
          size={25}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.text1}>Find place now</Text>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: SCREEN_WIDTH}}
        renderTabBar={renderTabBar}
        tabBarPosition="top"
      />
    </View>
  );
};

export default SlotDetailsScreen;

const styles = StyleSheet.create({
  container: {flex: 1, top: 0, left: 0, right: 0},
  view1: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.buttons,
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 25,
  },
  text1: {
    fontWeight: 'bold',
    marginLeft: 40,
    color: colors.black,
    fontSize: 18,
  },
  tab: {
    paddingTop: 0,
    backgroundColor: colors.buttons,
    justifyContent: 'space-between',
  },
  tabContainer: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  tabLabel: {fontWeight: 'bold', color: colors.cardbackground},
  tabStyle: {width: SCREEN_WIDTH / 4, maxHeight: 45},
});
