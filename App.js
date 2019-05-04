
import React, { Component } from 'react';
import {Text,View,TouchableHighlight, PermissionsAndroid, StyleSheet} from 'react-native';
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
    //called after te successful scanning of Barcode
    this.setState({ value: value });
    this.setState({ opneScanner: false });
  }

  renderCamera() {
    var that =this;
    //Start Scanning
      async function requestCameraPermission() {
        try {
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

       /* //const { canDetectFaces, canDetectText, canDetectBarcode } = this.state;
    const {canDetectBarcode } = this.state;
    return (

      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
        faceDetectionLandmarks={
          RNCamera.Constants.FaceDetection.Landmarks
            ? RNCamera.Constants.FaceDetection.Landmarks.all
            : null
        }
        //onFacesDetected={canDetectFaces ? this.facesDetected : null}
        //onTextRecognized={canDetectText ? this.textRecognized : null}
        onGoogleVisionBarcodesDetected={canDetectBarcode ? this.barcodeRecognized : null}
      >
        <View
          style={{
            flex: 0.5,
          }}
        >
          <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <TouchableOpacity style={styles.flipButton} onPress={this.toggleFacing.bind(this)}>
              <Text style={styles.flipText}> FLIP </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flipButton} onPress={this.toggleFlash.bind(this)}>
              <Text style={styles.flipText}> FLASH: {this.state.flash} </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flipButton} onPress={this.toggleWB.bind(this)}>
              <Text style={styles.flipText}> WB: {this.state.whiteBalance} </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            
            <TouchableOpacity onPress={this.toggle('canDetectBarcode')} style={styles.flipButton}>
              <Text style={styles.flipText}>
                {!canDetectBarcode ? 'Detect Barcode' : 'Detecting Barcode'}
              </Text>
            </TouchableOpacity>

          </View>
        </View>

        <View        
          style={{
            flex: 0.4,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}
        >
          <Slider
            style={{ width: 150, marginTop: 15, alignSelf: 'flex-end' }}
            onValueChange={this.setFocusDepth.bind(this)}
            step={0.1}
            disabled={this.state.autoFocus === 'on'}
          />
        </View>

        {this.state.zoom !== 0 && (
          <Text style={[styles.flipText, styles.zoomText]}>Zoom: {this.state.zoom}</Text>
        )}

        <View
          style={{
            flex: 0.1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}
        >
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
            onPress={this.zoomIn.bind(this)}
          >
            <Text style={styles.flipText}> + </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
            onPress={this.zoomOut.bind(this)}
          >
            <Text style={styles.flipText}> - </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.25, alignSelf: 'flex-end' }]}
            onPress={this.toggleFocus.bind(this)}
          >
            <Text style={styles.flipText}> AF : {this.state.autoFocus} </Text>
          </TouchableOpacity>

        </View>
        {!!canDetectBarcode && this.renderBarcodes()}
      </RNCamera>
    ); */
   
  }

  handlePress = async () => {
    fetch('http://35.246.54.179/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
  
          "email" : "sahandilshan222@gmail.com",
          "pass" : "test1234"
        })
  });
    fetch('http://35.246.54.179/barcode/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "barcode" : "100000001"
  
        })
  })
      .then((response) => response.json())
      .then((responseJson) => {
   //alert("Brand:  " + responseJson.brand +" Discount:  " + responseJson.discount+" Name:  " + responseJson.name + " Img:  " + responseJson.image);
   <Text style={styles.simpleText}>{'Details: '+ responseJson.brand }</Text>
  
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    //return <View style={styles.container}>{this.renderCamera()}</View>;

    //If value is set then return this view
    if (!this.state.opneScanner) {
      return (
        //display details
        <View style={styles.container}>
            <Text style={styles.simpleText}>{this.state.value ? 'Scanned Code: '+this.state.value : ''}</Text>

            <TouchableHighlight
              onPress={() => this.renderCamera()}
              style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>
                Back
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
