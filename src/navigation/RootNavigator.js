import React,{useContext} from "react";
import {NavigationContainer} from "@react-navigation/native"
import AuthStack from "./authNavigators";
import { AppStack } from "./appStack";
import { SignInContext } from "../context/authContext";




export default function RootNavigator() {
  const {signedIn} = useContext(SignInContext);
  return (
    <NavigationContainer>
      {
        signedIn.userToken ===null ?   //---check this,, error page 10 balannaaaaaaaaa
          <AuthStack />
         : 
          <AppStack />
        
      }
    </NavigationContainer>
  )
}