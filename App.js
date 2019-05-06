import React, { Component } from 'react';
import {Text,View,TouchableHighlight, PermissionsAndroid, StyleSheet,Alert} from 'react-native';
import { CameraKitCameraScreen, } from 'react-native-camera-kit';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      //variable to hold the value
      value: '',
      opneScanner: true,
    };
  }

  static navigationOptions =
  {
    title: 'BARCODE',

  };

  //function for flip camera
  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }
//function for turn on flash
  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }
//function for change WB
  toggleWB() {
    this.setState({
      whiteBalance: wbOrder[this.state.whiteBalance],
    });
  }
//function for focus camera
  toggleFocus() {
    this.setState({
      autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
    });
  }
//function for zoom out
  zoomOut() {
    this.setState({
      zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
    });
  }
//function for zoom out
  zoomIn() {
    this.setState({
      zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
    });
  }

  renderBarcode(value) {
    //called after the successful scanning of Barcode
    this.setState({ value: value });
    this.setState({ opneScanner: false });
  }

  renderCamera() {
    var that =this;
    //Start Scanning
      async function requestCameraPermission() {
        try {
		//request permission from user
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,{
              'title': 'Permission to use camera',
              'message': 'We need your permission to access your camera '
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //If CAMERA Permission is granted
            that.setState({ value: '' });
            that.setState({ opneScanner: true });
          } else {
            alert("Access denied");
          }
        } catch (err) {
          alert("Error!",err);
          console.warn(err);
        }
      }
      //Calling the camera permission function
      requestCameraPermission();

    
  }
//function to send http POST request
  handlePress = async (value) => {
    //fetching with server
    fetch('http://104.196.211.215/barcode/', {
      method: 'POST',
      headers: {
      Accept: 'application/json',
     'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       'barcode':value
     
      }),
    
     }).then((response) => response.json())
     .then((responseJson) => {
      console.log(responseJson);
	  //check value is emmpty or not
      if(this.isEmpty(responseJson)){
       Alert.alert("Sorry Item Not Found");
      }
      else{
        this.props.navigation.navigate('BarcodeView',{name:responseJson.name,brand:responseJson.brand,image:responseJson.image,price:responseJson.price}); 
      }
     
    //
     
    })
    .catch((error) => {
    console.error(error);
    });
  }

  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
};

  render() {
    //return <View style={styles.container}>{this.renderCamera()}</View>;

    //If value is set then return this view
    if (!this.state.opneScanner) {
      return (
        //display details of barcode
        <View style={styles.container}>
            <Text style={styles.simpleText}>{this.state.value ? 'Scanned Code: '+this.state.value : ''}</Text>

           //test barcode with database
            <TouchableHighlight
              onPress={() => this.handlePress(this.state.value)}
              style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>
                 Match With Store
                </Text>
            </TouchableHighlight>
			
			    //go back and scan barcode again
            <TouchableHighlight
              onPress={() => this.renderCamera()}
              style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>
                Scan Again
                </Text>
            </TouchableHighlight>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
      
        <CameraKitCameraScreen

          cameraOptions={{
              flashMode: 'auto',
              focusMode: 'on',
              zoomMode: 'on',
              ratioOverlay:'1:1', 
              ratioOverlayColor: '#00000077'
          }}
          showFrame={true}
          scanBarcode={true}
          laserColor={'red'}
          frameColor={'yellow'}
          colorForScannerFrame={'black'}
          onReadCode={event =>
            this.renderBarcode(event.nativeEvent.codeStringValue)
          }
        />
      </View>
    );
  }
}
//styles
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
    fontSize: 24, 
    alignSelf: 'center', 
    padding: 10, 
    marginTop: 30 
  },
  simpleText: { 
    color: 'black', 
    fontSize: 20, 
    alignSelf: 'center', 
    padding: 10, 
    marginTop: 16
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  zoomText: {
    position: 'absolute',
    bottom: 70,
    zIndex: 2,
    left: 2,
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  text: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#F00',
    justifyContent: 'center',
  },
  textBlock: {
    color: '#F00',
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});
