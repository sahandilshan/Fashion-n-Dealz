import React from 'react';
import { Button, View, Text,Image,StyleSheet,Platform,TouchableHighlight } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation'; 


class DetailsScreen extends React.Component {
  static navigationOptions =
  {
    title: 'BarcodeView',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#c41bb0',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },

  };
    render() {
     // const { navigation } = this.props;
      const name = this.props.navigation.getParam('name','no name');
      const brand= this.props.navigation.getParam('brand','no brand');
      const img= this.props.navigation.getParam('image','imagefound');
      const price= this.props.navigation.getParam('price','not found');
      //img=JSON.stringify(img);
      return (
        <View style={styles.MainContainer}>
        
        <Image style={styles.ImageComponentStyle} source = {{ uri:img.toString()}} />
        <Text>Name:{name}</Text>
        <Text>Brand:{brand}</Text>
        <Text>Price:{price}</Text>
        <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Second')}
              style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize:12}}>
                Back
                </Text>
            </TouchableHighlight>
        </View>
      );
    }
  }

  export default DetailsScreen;

  const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      paddingTop: Platform.OS === 'ios' ? 20 : 30,
      backgroundColor: '#ffffff',
      padding:10,
      //justifyContent: 'center',
      alignItems: 'center',
    },
    ImageComponentStyle: {
      
      justifyContent: 'center',
      //flex:1,
      //alignItems: 'center',
      //height: 20,
      //width:20,
     
      width:200, 
      height:200,
     
    },
    textViewContainerHeading: {
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 20,
      color: '#000000',
      fontWeight:'bold'
    },
      textViewContainer: {
      paddingLeft: 10,
      paddingRight: 10,
    },button: {
      alignItems: 'center',
      backgroundColor: '#2c3539',
      padding: 10,
      width:250,
      marginTop:16
    }
  });
  