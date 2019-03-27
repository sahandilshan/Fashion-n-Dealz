import React from 'react';
import {Text,View} from 'react-native';

const Header =(props)=>{
    const {ViewStyle,textstyle,text}=styles;
   
    return(
        <View style={ViewStyle}>
        <Text style={textstyle}>{props.head}</Text>
        </View>
    );
}
const styles={
  ViewStyle:{
      backgroundColor:'#F8F8F8',
      justifyContent:'center',
      alignItems:'center',
      paddingTop:15,
      height:60,
      shadowColor:'#000',
      shadowOffset:{width:0,height:20},
      shadowOpacity:0.9


  },
  textstyle:{
    fontSize:40,
    color:'blue',
   
  },
  text:{
      color:'red',
      fontSize:40
  }
};

export default Header;