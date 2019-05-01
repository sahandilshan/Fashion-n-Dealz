/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {KeyboardAvoidingView, StyleSheet, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import Login from './screens/Login';
import Register from './screens/Register';
import ForgotPassword from './screens/ForgotPassword';
import { w } from './api/Dimensions';
import bgSrc from './assets/wallpaper.png';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBV_rxIEkOuxVL13UtzYTicE3C99g4zZx0",
    authDomain: "fashionndealz.firebaseapp.com",
    databaseURL: "https://fashionndealz.firebaseio.com",
    projectId: "fashionndealz",
    storageBucket: "fashionndealz.appspot.com",
    messagingSenderId: "579012181485"

};

firebase.initializeApp(config);
console.disableYellowBox = true;



export default class App extends Component {
  
  state = {
    currentScreen: 'login', // can be: 'login' or 'register' or 'forgot'
  };

  changeScreen = screenName => () => {
    this.setState({ currentScreen: screenName });
  };

  userSuccessfullyLoggedIn = (user) => {
    this.props.login(user);
  };

  render() {
    let screenToShow;

    switch(this.state.currentScreen) {
      case 'login':
        screenToShow = <Login change={this.changeScreen} success={this.userSuccessfullyLoggedIn}/>;
        break;
      case 'register':
        screenToShow = <Register change={this.changeScreen} />;
        break;
      case 'forgot':
        screenToShow = <ForgotPassword change={this.changeScreen}/>;
        break;
    }

    return (
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={-w(40)}
        style={styles.container}
      >
        <ImageBackground
          source={this.props.background}
          style={styles.background}
          resizeMode="stretch"

        >
          {screenToShow}
        </ImageBackground>
      </KeyboardAvoidingView>
    )
  }
}

App.propTypes = {
  login: PropTypes.func.isRequired,
};

App.defaultProps = {
  background:bgSrc ,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#555',
  },
  background: {
    width: '100%',
    height: '100%',
  }
  
});
