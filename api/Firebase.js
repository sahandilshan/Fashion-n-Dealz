import firebase from "firebase";
import { Alert} from 'react-native';


class Firebase {



  userLogin = (email, password) => {
    return new Promise(resolve => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(error => {
          switch (error.code) {
            case 'auth/invalid-email':
            Alert.alert(
              "Warning!",
              "Invalid Email format. Please try again!",
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ],
              { cancelable: false }
            );
              break;
            case 'auth/user-not-found':
            case 'auth/wrong-password':
            Alert.alert(
              "Warning!",
              "Invalid Email address or password",
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ],
              { cancelable: false }
            );
              break;
            default:
            Alert.alert(
              "Warning!",
              "Check your internet connection",
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ],
              { cancelable: false }
            );
          }
          resolve(null);
        }).then(user => {
        if (user) {
          resolve(user);
        }
      });
    })
  };
 

  createFirebaseAccount = (name, email, password, phoneNumber) => {
    
    return new Promise(resolve => {
      
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
        switch (error.code) {
          case 'auth/email-already-in-use':
          Alert.alert(
            "Warning!",
            "This Email address is already taken",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
            break;
          case 'auth/invalid-email':
          Alert.alert(
            "Warning!",
            "Invalid Email format. Please try again!",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
            break;
          case 'auth/weak-password':
          Alert.alert(
            "Warning!",
            "Password is too weak. Try with special characters/ numbers",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
            break;
          default:
          Alert.alert(
            "Warning!",
            "Check your internet connection",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
        }
        resolve(false);
      }).then(info => {
        if (info) {
          
          firebase.auth().currentUser.updateProfile({
            displayName: name

          });

         firebase.database().ref('Users/').push({
              Email: email,
              UserName: name,
              PhoneNumber: phoneNumber,
              flag :0,
          });
          
          
          resolve(true);
        }
      });
    });
  };

  sendEmailWithPassword = (email) => {
    return new Promise(resolve => {
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          Alert.alert(
            "Warning!",
            "Email sent to your Email address with password reset link",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
          resolve(true);
        }).catch(error => {
          switch (error.code) {
            case 'auth/invalid-email':
            Alert.alert(
              "Warning!",
              "Invalid Email format. Please try again!",
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ],
              { cancelable: false }
            );
              break;
            case 'auth/user-not-found':
            Alert.alert(
              "Warning!",
              "This Email address is not registered",
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ],
              { cancelable: false }
            );
              break;
            default:
            Alert.alert(
              "Warning!",
              "Check your internet connection",
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ],
              { cancelable: false }
            );
          }
          resolve(false);
        });
    })
  };

}

export default new Firebase();
