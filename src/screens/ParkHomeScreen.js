import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ParkHeader from '../components/ParkHeader'
import { colors } from '../global/Styles'

const ParkHomeScreen = ({navigation,route}) => {

  const{id,park}=route.params


  return (
    <View>
      <ParkHeader id={id} navigation={navigation}/>
    </View>
  )
}

export default ParkHomeScreen

const styles = StyleSheet.create({



})