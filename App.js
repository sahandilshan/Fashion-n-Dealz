import React ,{Component}from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, Platform, Dimensions } from 'react-native';
import  QRCODE from './src/components/qrcode';
import  BARCODE  from './src/components/barcode/barcode'
import MenuDrawer from './src/menudrawer/MenuDrawer';
 
import { createAppContainer, createMaterialTopTabNavigator, createDrawerNavigator, createStackNavigator } from "react-navigation";
 

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
	drawerWidth: WIDTH*0.83,
	contentComponent: ({ navigation }) => {
		return(<MenuDrawer navigation={navigation} />)
	}
}


class HamburgerIcon extends Component {
 
  toggleDrawer = () => {
 
    this.props.navigationProps.toggleDrawer();
 
  }
 
  render() {
 
    return (
 
      <View style={{ flexDirection: 'row' }}>
 
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)} >
 
          <Image
            source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png' }}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
 
        </TouchableOpacity>
 
      </View>
 
    );
 
 
  }
}
 
 
class Student_Screen extends Component {
 
  static navigationOptions =
    {
      title: 'Student',
 
    };
 
  gotoNextActivity = () => {
    this.props.navigation.navigate('Forth');
 
  }
 
  render() {
 
    return (
 
      <View style={styles.MainContainer}>
 
        <Text style={styles.text}>This is Student Screen Activity.</Text>
 
        <Button onPress={this.gotoNextActivity} title='Open Details Activity' />
 
      </View>
    );
  }
}
 
class Details_Screen extends Component {
 
  static navigationOptions =
    {
      title: 'Details Screen',
 
    };
 
  gotoNextActivity = () => {
    this.props.navigation.navigate('Second');
 
  }
 
  render() {
 
    return (
 
      <View style={styles.MainContainer}>
 
        <Text style={styles.text}>This is Details Screen Activity.</Text>
 
      </View>
    );
  }
}
 
export const Tab_1 = createMaterialTopTabNavigator({
  First: {
    screen: QRCODE,
  },
  Second: {
    screen: BARCODE,
  }
}, {
    tabBarPosition: 'top',
 
    swipeEnabled: true,
 
    tabBarOptions: {
 
      activeTintColor: '#fff',
      pressColor: '#004D40',
      inactiveTintColor: '#fff',
      style: {
 
        backgroundColor: '#00B8D4'
 
      },
 
      labelStyle: {
        fontSize: 16,
        fontWeight: '200'
      }
    }
 
  });
 
export const Tab_2 = createMaterialTopTabNavigator({
  Third: {
    screen: Student_Screen,
  },
  Forth: {
    screen: Details_Screen,
  }
}, {
    tabBarPosition: 'top',
 
    swipeEnabled: true,
 
    tabBarOptions: {
 
      activeTintColor: '#fff',
      pressColor: '#004D40',
      inactiveTintColor: '#fff',
      style: {
 
        backgroundColor: '#00B8D4'
 
      },
 
      labelStyle: {
        fontSize: 16,
        fontWeight: '200'
      }
    }
 
  });
 
const First_2_Tabs = createStackNavigator({
  First: {
    screen: Tab_1,
    navigationOptions: ({ navigation }) => ({
      title: 'First Screen',
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#00B8D4',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      },
      headerTintColor: '#fff',
    })
  },
});
 
const Second_2_Tabs = createStackNavigator({
  First: {
    screen: Tab_2,
    navigationOptions: ({ navigation }) => ({
      title: 'Second Screen',
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#00B8D4',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      },
      headerTintColor: '#fff',
    })
  },
});
 
const MyDrawerNavigator = createDrawerNavigator({
 
  Home_Menu_Label: {
 
    screen: First_2_Tabs,
 
  },
 
  Student_Menu_Label: {
 
    screen: Second_2_Tabs,
 
  }
 
},DrawerConfig

);
 

export default createAppContainer(MyDrawerNavigator);
 
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

