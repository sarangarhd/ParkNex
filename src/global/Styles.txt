import { height } from '@fortawesome/free-brands-svg-icons/fa42Group'
import React from 'react'


export const colors = {
  buttons:'#ff8c52',
  statusbar:'#ff8c52',
  headerText:'white',
  // grey4:'#424242',
  grey5: '#e1e8ee',
  grey3:'#86939e',
  grey4:'#5c5c5c',
  grey2:'#E0E0E0',
  grey1:'#43484d',
  cardbackground:'#f0f0f0',
  black:'#000000',

}

export const parameters = {
  headerHeight: 45,

  styledButton:{
    backgroundColor:colors.buttons,
    borderRadius: 12,
    height: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: 100,
    marginTop: 10,
  },

  buttonTitle:{
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },
}



export const title = {
  fontSize: 25,
  fontWeight: 'bold',
  color: '#ff8c52',
  textAlign: 'left',
  marginTop: 10,
 
}



export const  fonts ={
  ios: {
  regular: 'System',
  light: 'System',
  lightItalic: 'System',
  bold: 'System',
  boldItalic: 'System',
  black: 'System',
  blackItalic: 'System',
},
android: {
  regular: 'Roboto',
  italic: 'Roboto-Italic',
  thin: 'Roboto-Thin',
  thinItalic: 'Roboto-ThinItalic',
  light: 'Roboto-Light',
  lightItalic: 'Roboto-LightItalic',
  medium: 'Roboto-Medium',
  mediumItalic: 'Roboto-MediumItalic',
  bold: 'Roboto-Bold',
  boldItalic: 'Roboto-BoldItalic',
  condensed: 'RobotoCondensed-Regular',
  condensedItalic: 'RobotoCondensed-Italic',
}
}