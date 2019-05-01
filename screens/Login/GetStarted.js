import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import {w, h, totalSize} from '../../api/Dimensions';

export default class GetStarted extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.click}
        style={styles.button}
        activeOpacity={0.6}
      >
        {this.props.isLogin
          ? <ActivityIndicator size="large" style={styles.spinner} color='white' />
          : <Text style={styles.text}>GET STARTED</Text>}
      </TouchableOpacity>
    );
  }
}

GetStarted.propTypes = {
  click: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  button: {
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: w(2),
    backgroundColor: 'transparent',
    borderRadius: w(10),
    borderColor: '#E0E0E0',
    borderWidth : 1,
    marginTop: h(8),
  },
  text: {
    color: 'white',
    fontWeight: '700',
    paddingVertical: h(1),
    fontSize: totalSize(2.1),
  },
  spinner: {
    height: h(5),
  },
});
