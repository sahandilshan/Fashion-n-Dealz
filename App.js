/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button} from 'react-native';

import items from '.src/components/Items/Items';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  state = {
    placeName : "",
    items : [],
  }

  placeNameChangeHandeler = val => 
  { this.setState({placeName:val});
  }

  placeSubmitHandeler = () => {
    if (this.state.placeName.trim() === "") {
      return;
    }
  }
  render() {

    <Items/>
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
        <TextInput 
        
        placeholder= {"Search for an item or a brand"}
        value ={this.state.placeName} 
        onChangeText = {this.placeNameChangeHandeler}
        style = {styles.placeInput}/>
        <Button title= "Search" style = {styles.placeButton} onPress = {this.placeSubmitHandeler}/>
        </View>
        
      </View>
    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: '#9361dd',
  },
  inputContainer: {
    //flex: 1,
    width: "100%",
    flexDirection : "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  placeInput: {
    width : "70%",
  },
  placeButton: {
    width: "30%",
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
