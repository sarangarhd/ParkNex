import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { colors, parameters } from '../global/Styles';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Icon from 'react-native-vector-icons/FontAwesome'; 



export default function Header({title,type,navigation}) {
  return (
    <View style={styles.header}>
      
      <Icon style={styles.arrow}  name={type} onPress={()=>{navigation.goBack()}}  /> 
      
    
      <View>
        <Text style={styles.headerText}>
          {title}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  arrow:{
    marginLeft:20,
    marginTop:15,
    fontSize:20,
    color:"#fffc"
  },

  header : {
    flexDirection:"row",
    backgroundColor:colors.buttons,
    height:parameters.headerHeight,
    
  },

  headerText : {
    color:colors.headerText,
    fontSize:22,
    fontWeight:'bold',
    letterSpacing:1,
    marginLeft:20,
    marginTop:10,
  }
})

