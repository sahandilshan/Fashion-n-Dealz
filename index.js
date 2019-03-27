/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry,View,ImageBackground,Text} from 'react-native';
import React from 'react';
import ImagePicker from 'react-native-image-picker';
import Header from './src/components/Header';
import Camera from './src/components/Camera';
import FadeInView from './src/components/FadeInView'





const App=()=>{
    
 return(
    <View style={{flex: 1}}>
      <Camera />
    </View>
 );};



AppRegistry.registerComponent('AwesomeProject', () => App);
