import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import firebase from '../firebase';
import ParkHeader from '../components/ParkHeader';
import { colors, fonts } from '../global/Styles';
import { Icon } from 'react-native-elements';
import { TabView, TabBar } from 'react-native-tab-view';
import ParkScreen from './parkTabs/parkScreen';

const SCREEN_WIDTH = Dimensions.get('window').width;
const initialLayout = SCREEN_WIDTH;

const ParkHomeScreen = ({ navigation, route }) => {
  const { parkId, park } = route.params;
  const [parkingData, setParkingData] = useState(null);
  const [ownerData, setOwnerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'PARK' },
    { key: 'second', title: 'INFO' },
    { key: 'third', title: 'REVIEWS' },
    { key: 'fourth', title: 'GALLERY' },
  ]);

  
  useEffect(() => {
    const fetchParkingData = async () => {
      try {
        const parkRef = firebase.database().ref(`parkingData/${parkId}`);
        const parkSnapshot = await parkRef.once('value');
        const parkData = parkSnapshot.val();
        
        if (parkData) {
          setParkingData(parkData);
          if (parkData.owner) {
            const ownerRef = firebase.database().ref(`users/${parkData.owner}`);
            const ownerSnapshot = await ownerRef.once('value');
            setOwnerData(ownerSnapshot.val());
          }
        } else {
          console.error('No park data found for the given ID:', parkId);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchParkingData();
  }, [parkId]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.cardbackground }}
      tabStyle={styles.tabStyle}
      scrollEnabled={true}
      style={styles.tab}
      labelStyle={styles.tabLabel}
      contentContainerStyle={styles.tabContainer}
    />
  );

  const parkPressed = () => {
    navigation.navigate("SlotDetailsScreen", { parkId: parkId });
  };
 
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.buttons} />
      </View>
    );
  }

  if (!parkingData) {
    return (
      <View style={styles.container}>
        <Text>No park data found for the given ID.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <ParkHeader id={parkId} navigation={navigation} />
          {parkingData.discount && (
            <View style={styles.view1}>
              <Text style={styles.text1}>
                GET {parkingData.discount}% OFF IN YOUR FIRST RESERVATION
              </Text>
            </View>
          )}

          <View style={styles.view2}>
            <View style={styles.view3}>
              <Text style={styles.text2}>{parkingData.ParkName}</Text>
              <View style={styles.view4}>
                <Icon name="star" type="material-community" color={colors.grey3} size={15} />
                <Text style={styles.text4}>{parkingData.averageReview}</Text>
                <Text style={styles.text5}>{parkingData.NumberOfReviews}</Text>
                <Icon name="map-marker" type="material-community" color={colors.grey3} size={15} />
                <Text style={styles.text5}>{parkingData.farAway} Km</Text>
              </View>
            </View>
            <View style={styles.view5}>
              <Text style={styles.text6}>Slots</Text>
              <View style={styles.view7}>
                <Text style={styles.text7}>{parkingData.NumberOfSpaces}</Text>
              </View>
            </View>
            <View style={styles.view8}>
              <Text style={styles.text6}>Available</Text>
              <View style={styles.view9}>
                <Text style={styles.text9}>{parkingData.AvailableSlots}</Text>
              </View>
            </View>
          </View>
          {ownerData && (
            <View style={styles.ownerInfo}>
              <Text style={styles.ownerText}>Owner: {ownerData.name}</Text>
              <Text style={styles.ownerText}>Email: {ownerData.email}</Text>
              <Text style={styles.ownerText}>Phone: {ownerData.phone_number}</Text>
            </View>
          )}
        </View>
        <View style={styles.view10}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={() => <View />}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderTabBar={renderTabBar}
            tabBarPosition="top"
          />
        </View>
        {index === 0 && <ParkScreen onPress={parkPressed} />}
      </ScrollView>
      <TouchableOpacity>
        <View style={styles.view11}>
          <View style={styles.view12}>
            <Text style={styles.text13}>VIEW BOOKINGS</Text>
            <View style={styles.view13}>
              <Text style={styles.text13}> 0 </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ParkHomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  view1: { padding: 3, alignItems: 'center', justifyContent: 'center' },
  text1: { color: 'green', fontSize: 14, fontWeight: 'bold' },
  view2: { flexDirection: 'row', flex: 1, marginBottom: 5, marginHorizontal: 10, justifyContent: 'space-between' },
  view3: { flex: 8 },
  text2: { fontSize: 20, fontWeight: 'bold', color: colors.grey1 },
  view4: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  text4: { fontFamily: fonts.android.bold, fontSize: 13, color: colors.grey3, marginLeft: 2 },
  text5: { fontFamily: fonts.android.bold, fontSize: 13, color: colors.grey3, marginLeft: 2, marginRight: 5 },
  text6: { fontFamily: fonts.android.bold, fontSize: 13, color: colors.grey3, marginLeft: 0 },
  view5: { flex: 3, alignItems: 'center' },
  view7: { width: 40, height: 40, alignItems: 'center', borderRadius: 20, justifyContent: 'space-around' },
  text7: { fontSize: 16, fontWeight: 'bold', color: colors.black, marginTop: 5 },
  view8: { flex: 3, alignItems: 'center' },
  text9: { fontSize: 15, fontWeight: 'bold', color: colors.cardbackground },
  view9: { width: 40, height: 40, backgroundColor: colors.buttons, alignItems: 'center', borderRadius: 20, justifyContent: 'space-around' },
  view10: { elevation: 10, backgroundColor: colors.pagebackground },
  view11: { backgroundColor: colors.buttons, height: 50, alignContent: 'center', marginBottom: 0, justifyContent: 'center' },
  view12: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  text12: { padding: 10, fontWeight: 'bold', fontSize: 18, color: colors.cardbackground },
  view13: { borderWidth: 1, marginRight: 10, borderColor: colors.cardbackground, borderRadius: 6, paddingBottom: 2 },
  text13: { paddingHorizontal: 3, fontWeight: 'bold', fontSize: 18, color: colors.cardbackground },
  tab: { paddingTop: 0, backgroundColor: colors.buttons, justifyContent: 'space-between', alignItems: 'center' },
  tabContainer: { alignItems: 'center', alignContent: 'center', justifyContent: 'center' },
  tabLabel: { fontWeight: 'bold', color: colors.cardbackground },
  tabStyle: { width: SCREEN_WIDTH / 4, maxHeight: 45 },
  view14: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: colors.buttons, top: 0, left: 0, right: 0, paddingTop: 25 },
  text14: { fontWeight: 'bold', marginLeft: 40, color: colors.black, fontSize: 18 },
  view15: { marginTop: 5, paddingBottom: 20 },
  ownerInfo: { marginTop: 20, padding: 10, backgroundColor: colors.cardbackground, borderRadius: 10 },
  ownerText: { fontSize: 16, color: colors.grey1, marginBottom: 5 }
});
