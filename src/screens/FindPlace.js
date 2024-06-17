//menu tab-load menu to user
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import {floor1} from '../global/Data';
import ParkCard from '../components/ParkCard';
import SlotCard from '../components/SlotCard';

export default function Route1() {
  return (
    <View style={{flex: 1}}>
    
        
       {/* -----------------------------------------21last net--- */}

          
            <SlotCard/>
          
        
        
      
    </View>
  );
}

export const Route2 = () => <View style={styles.scene} />;
export const Route3 = () => <View style={styles.scene} />;
export const Route4 = () => (
  <View style={{...styles.scene, backgroundColor: 'green'}} />
);

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: '#673ab7',
  },

  view2: {marginTop: 5, paddingBottom: 20},

  scene2: {backgroundColor: '#673ab7'},
});
