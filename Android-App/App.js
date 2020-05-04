
import React, {Component} from 'react';
import axios from 'axios';


import Navigator from './routes/homeStack';
import DrawerNavigator from './routes/DrawerNavigator'


import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class App extends Component {

 	render(){

    return(
        <DrawerNavigator/>
    )
  }
}
const styles = StyleSheet.create({
 container:{
   paddingTop: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',

 },
 input:{
  borderWidth: 1,
  borderColor: '#777',
  padding: 8,
  margin: 10,
  width: 200,	
},
output:{
  flex : 1,
  padding: 10,
  margin: 10,
}
});

