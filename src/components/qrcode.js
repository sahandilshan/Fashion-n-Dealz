import React,{Component} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';

class QrCode extends Component {
 
    static navigationOptions =
      {
        title: 'QRCODE',
   
      };
   
    gotoNextActivity = () => {
      this.props.navigation.navigate('Second');
   
    }
   
    render() {
   
      return (
   
        <View style={styles.MainContainer}>
   
          <Text style={styles.text}>This is Home Screen Activity.</Text>
   
          <Button onPress={this.gotoNextActivity} title='Open Second Activity' />
   
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
 
    MainContainer: {
   
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#f5fcff',
      padding: 11
   
    },
   
    text:
    {
      fontSize: 22,
      color: '#000',
      textAlign: 'center',
      marginBottom: 10
    },
   
  });

  export default QrCode;