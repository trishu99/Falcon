import React, { Component } from 'react';
import { StyleSheet,Alert, Button, Text, View, TextInput, TouchableOpacity,ScrollView, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


import axios from 'axios';

import GetLocation from 'react-native-get-location'


import {NetworkInfo} from 'react-native-network-info';

import {Actions} from 'react-native-router-flux';

import Toast from "@remobile/react-native-toast";

import BluetoothSerial, {
  withSubscription
} from "react-native-bluetooth-serial-next";





export default class App extends Component {

    constructor(props){
        super(props);
        this.events = null;

        this.state={
            name : '',
            address :'',
            email:'',
            phone :'',
            addharno :'',
            bssid:'',
            reply: 5,
            login: 'failure',
            pass: 1,
            lat: '',
            long : '',
      
        }
    }

    passdata(){
      console.log("plzz see");
      console.log(this.state.pass);
      this.props.navigation.navigate('Home', {
        reply : this.state.pass,
        login : this.state.login,
        
      })
    }

    saveData = async e => {
      e.preventDefault();
      await NetworkInfo.getBSSID().then(bssid => {
        console.log(bssid);
        this.setState({
          bssid : bssid
        });
      })

     await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
    })
    .then(location => {
        console.log(location);
        this.setState({
          lat: location.latitude,
          long: location.longitude,
        });
  
    })
    .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
    })
  
    
   
    const data = {
      'name' : this.state.name,
      'address' : this.state.address,
      'email' : this.state.email,
      'phone' : this.state.phone,
      'addharno' : this.state.addharno,
      'bssid' : (this.state.bssid).toUpperCase(),
      'lat' : this.state.lat,
      'long' : this.state.long,
    };
    
    console.log(data);

    await axios.post('http://192.168.43.114:8000/addUser', data)
    .then(response => {
      console.log(response.data);
      this.setState({
        reply : response.data,
        login : "success",
        pass : 2,
      })

    })
    .catch(err => {
      console.log("there is error")
      console.log(err + " see this "+err.response);
    });
    console.log("came here")

        //save data with asyncstorage
    
        console.log(this.state.login)
        let user = "success"
        AsyncStorage.setItem('user', user);
        try{
          let user = await AsyncStorage.getItem('user');
          console.log(user);
          //alert(user.name);
        }
        catch(error){
          console.log("problem");
        }

        
  
        this.passdata();
  
    }

      renderpage = () => {
        console.log("see this")
        return <View> <About /></View>
      }
    

    render() {

    const { navigate } = this.props.navigation;  


        return(
            <View style={styles.container}>
              <ScrollView>
              <Text style={styles.header}>Register</Text>

                <TextInput style={styles.inputBox}
                onChangeText={(name) => this.setState({name})}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="name"
                placeholderTextColor = "#002f6c"
                selectionColor="#fff"
                />

                <TextInput style={styles.inputBox}
                onChangeText={(address) => this.setState({address})}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="address"
                placeholderTextColor = "#002f6c"
                selectionColor="#fff"
                />

                
                <TextInput style={styles.inputBox}
                onChangeText={(email) => this.setState({email})}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Email"
                placeholderTextColor = "#002f6c"
                selectionColor="#fff"
                keyboardType="email-address"
                />

                <TextInput style={styles.inputBox}
                onChangeText={(phone) => this.setState({phone})}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="phone no."
                placeholderTextColor = "#002f6c"
                selectionColor="#fff"
                keyboardType="numeric"
                />

                <TextInput style={styles.inputBox}
                onChangeText={(addharno) => this.setState({addharno})}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="addhar card no"
                placeholderTextColor = "#002f6c"
                selectionColor="#fff"
                keyboardType="numeric"
                />





                
                
                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.saveData}>Submit</Text>
                </TouchableOpacity>
            <View>
              {this.state.reply === 0 && (
                Alert.alert("successfully added")
              )}
              {this.state.reply === 1 && (
                Alert.alert("Already exits")
              )}
              {this.state.reply === 2 && (
                Alert.alert("Might be infected")
              )}
             
            </View>
                </ScrollView>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBox: {
        width: 300,
        backgroundColor: '#eeeeee', 
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    header:{
      paddingTop: 10,
      fontSize : 30,
      paddingBottom: 10,
    },
      power:{

        backgroundColor:'#99ff66',
        padding: 20,
        fontSize: 30,
        textAlign: 'center',
    },

});
