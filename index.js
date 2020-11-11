/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image,ScrollView,SafeAreaView,Modal,close ,visible} from 'react-native';
import React from 'react';
import Headstyle from './src/styles/headstyle.js'

const adep=()=>{
    
    return(
    
   
      <View style={{flex:1}}>

      <App></App>
      </View>
 
     
    );};
    const styles = StyleSheet.create({

        MainContainer: {
      
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#f5fcff',
          padding: 11
      
        },
        contentContainer: {
          paddingVertical: 20
        }
        ,
      
        text:
        {
          fontSize: 22,
          color: '#000',
          textAlign: 'center',
          marginBottom: 10
        },
      
      });
AppRegistry.registerComponent(appName, () => adep);
