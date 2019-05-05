import React, { Component } from 'react';

import {
   Text,
   View,
   Linking, 
   TouchableHighlight, 
   PermissionsAndroid, 
   Platform, 
   StyleSheet,
   TouchableOpacity,
   Alert
  } from 'react-native';

import { CameraKitCameraScreen, } from 'react-native-camera-kit';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      qrvalue: '',        //variable to hold the qr value
      opneScanner: false,
    };
  }

  onOpenlink() {
    Linking.openURL(this.state.qrvalue);
  }
  //after scanning qr code
  onBarcodeScan(qrvalue) {
    this.setState({ qrvalue: qrvalue });
    this.setState({ opneScanner: false });
  }
  onOpneScanner() {
    var that =this;
      
    if(Platform.OS === 'android'){
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,{
              'title': 'CameraExample App Camera Permission',
              'message': 'CameraExample App needs access to your camera '
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            
            that.setState({ qrvalue: '' });
            that.setState({ opneScanner: true });
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
          alert("Camera permission err",err);
          console.warn(err);
        }
      }
      requestCameraPermission();
    }else{
      that.setState({ qrvalue: '' });
      that.setState({ opneScanner: true });
    }    
  }

  handlePress = async () => {
    //splitting the value of qrcode variable to get the beanch and shop seperately
    var div = this.state.qrvalue.split(" ");
    shop = div[0];
    branch=div[1];

    fetch('http://104.196.211.215/detectShop/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "shop_name" :shop,
          "branch" : branch
         
        })
  })
      .then((response) => response.json())
      .then((responseJson) => {
      Alert.alert(responseJson.msg+" : "+this.state.qrvalue+" branch.");
   
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    let displayModal;
    //If qrvalue is set 
    if (!this.state.opneScanner) {
      return (
        <View style={styles.container}>
            <Text style={styles.heading}> QR Code Scanner</Text>
            {/* <Text style={styles.simpleText}>{this.state.qrvalue ? 'Scanned QR Code: '+this.state.qrvalue : ''}</Text>
            {this.state.qrvalue.includes("http") ? 
              <TouchableHighlight
                onPress={() => this.onOpenlink()}
                style={styles.button}>
                  <Text style={{ color: '#FFFFFF', fontSize: 13 }}>Open Link</Text>
              </TouchableHighlight>
              : null
            } */}
            <TouchableHighlight
              onPress={() => this.onOpneScanner()}
              style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 18 }}>
                Touch to Scan
                </Text>
            </TouchableHighlight>
            

            <TouchableOpacity onPress={this.handlePress.bind(this)}>
             <Text style={{paddingTop: 50, color: '#FF0000',fontSize:20}}> ---Check if connected with the Shop--- </Text>
            </TouchableOpacity>

        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <CameraKitCameraScreen
          showFrame={true}
          
          scanBarcode={true}
          
          laserColor={'red'}
          
          frameColor={'yellow'}
          
          colorForScannerFrame={'black'}
          
          onReadCode={event =>
            this.onBarcodeScan(event.nativeEvent.codeStringValue)
          }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white'
  },
  button: {
    alignItems: 'center', 
    backgroundColor: '#2c3539',
    padding: 10,
    width:300,
    marginTop:16
  },
  heading: { 
    color: 'black', 
    fontSize: 35, 
    alignSelf: 'center', 
    padding: 10, 
    marginTop: 30 
  },
  
});