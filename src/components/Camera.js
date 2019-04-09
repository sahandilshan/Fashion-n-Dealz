import React,{Component} from 'react';
import ImagePicker from 'react-native-image-picker';
import {Text,View,Image,TextInput,Button,ImageBackground} from 'react-native';
import {
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'


class Camera extends Component{

  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    setTimeout( () => {
      SplashScreen.hide();
   },1500);
    
}
    constructor(props) {
        super(props);
        this.state = {
          filePath: {},
          pickedImage:null
        };
      }
      chooseFile = () => {
        var options = {
          title: 'Pic an image',
          customButtons: [
            { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(options, response => {
          console.log('Response = ', response);
     
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            let source = response;
            
            /*try {
              let response = await fetch(
                'https://app1-3223c.firebaseio.com/place.json',{
                  method:"POST",
                  body:JSON.stringify( {userName: "react",
                  password: "123"})}
              );
              let responseJson = await response.json();
              return responseJson.movies;
            } catch (error) {
              console.error(error);
            }*/
            
            fetch("https://app1-3223c.firebaseio.com/place.json",{
              method:"POST",
              body:JSON.stringify( {userName: "react",
              password: "123"})
              
            }).catch((error)=>{
              console.log("Api call error");
              alert(error.message);}).
            then(res=>res.json()).
            then(parsedres=>{//console.log(parsedres);
              alert(JSON.stringify(parsedres));
            });
            console.log("done");
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            this.setState({
              filePath: source,
              pickedImage:{uri:response.uri}
            });
          }
        });
      };
      render() {
        return (
          <ImageBackground source={{
            uri:
              'http://aboutreact.com/wp-content/uploads/2018/08/8f17765c523f5b75f3dc60ae145e9df7.jpg',
          }} style={{flex:1}}>
          <View style={styles.container}>
          <View style={styles.container}>  
           
            <Image
            source={{ uri: this.state.filePath.uri }}
            style={{ width: 250, height: 250,marginTop:20}}
            />
             <View style={styles.button}>
             <Button title="Capture" onPress={this.chooseFile.bind(this)} />
             </View>
            </View>
           
          </View>
          </ImageBackground>
          
        );
      }
    }
    const styles = StyleSheet.create({
      container: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      button:{
        marginTop:20
      },
    });
        
export default Camera;