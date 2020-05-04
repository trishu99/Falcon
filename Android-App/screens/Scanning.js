import React from "react";
import {
  Platform,
  ScrollView,
  Switch,
  Text,
  SafeAreaView,
  View,
  ActivityIndicator,
  Modal,
  PermissionsAndroid,
  Alert,
} from "react-native";

import axios from 'axios';

import GetLocation from 'react-native-get-location'

import {NetworkInfo} from 'react-native-network-info';

import PushNotification from 'react-native-push-notification'

import Toast from "@remobile/react-native-toast";
import BluetoothSerial, {
  withSubscription
} from "react-native-bluetooth-serial-next";
import { Buffer } from "buffer";

import Button from "./components/Button";
import DeviceList from "./components/DeviceList";
import styles from "./styles";

global.Buffer = Buffer;

const iconv = require("iconv-lite");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.events = null;
    this.state = {
      isEnabled: false,
      device: null,
      devices: [],
      scanning: false,
      processing: false,
      latitude : '',
      longitude : '',
      bssid1 : '',
    };
  }

  async componentDidMount() {
    this.events = this.props.events;

    
    
    try {
      const [isEnabled, devices] = await Promise.all([
        BluetoothSerial.isEnabled(),
        BluetoothSerial.list()
      ]);
      this.setState({
        isEnabled,
        devices: devices.map(device => ({
          ...device,
          paired: true,
          connected: false
        }))
      });
    } catch (e) {
      Toast.showShortBottom(e.message);
    }

    this.events.on("bluetoothEnabled", () => {
      Toast.showShortBottom("Bluetooth enabled");
      this.setState({ isEnabled: true });
    });

    this.events.on("bluetoothDisabled", () => {
      Toast.showShortBottom("Bluetooth disabled");
      this.setState({ isEnabled: false });
    });

    this.events.on("error", e => {
      if (e) {
        console.log(`Error: ${e.message}`);
        Toast.showShortBottom(e.message);
      }
    });
    console.log("perm ask");
    await this.askForUserPermissions();
    console.log("came here");

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
  })
  .then(location => {
      console.log(location);
      this.setState({
        latitude: location.latitude,
        longitude: location.longitude,
      });

  })
  .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
  })
  
  PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    console.log('LOCAL NOTIFICATION ==>', notification)
  },popInitialNotification: true,
  requestPermissions: true
})

  await NetworkInfo.getBSSID().then(bssid => {
    console.log(bssid);
    this.setState({
      bssid1 : bssid
    });
  })


    this.timer = setInterval(()=> this.discoverUnpairedDevices(), 5000)
  }


  async askForUserPermissions() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Bluetooth networks',
          'message': 'We need your permission to access your location'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Thank you for your permission! :)");
      } else {
        console.log("You have not given permission");
      }
    } catch (err) {
      console.warn(err)
    }
  }


  requestEnable = () => async () => {
    try {
      await BluetoothSerial.requestEnable();
      this.setState({ isEnabled: true });
    } catch (e) {
      Toast.showShortBottom(e.message);
    }
  };

  toggleBluetooth = async value => {
    try {
      if (value) {
        await BluetoothSerial.enable();
      } else {
        await BluetoothSerial.disable();
      }
    } catch (e) {
      Toast.showShortBottom(e.message);
    }
  };

  listDevices = async () => {
    try {
      const list = await BluetoothSerial.discoverUnpairedDevices();
      console.log("start list")
      console.log(list)
      console.log(this.state.devices)
      console.log("end list")
    } catch (e) {
      Toast.showShortBottom(e.message);
    }
  };

  discoverUnpairedDevices = async () => {
    this.setState({ scanning: true });

      const data = {
        'bssid1': (this.state.bssid1).toUpperCase(),
        'bssid2': '',
      }

      const unpairedDevices = await BluetoothSerial.discoverUnpairedDevices();
  
      if(unpairedDevices.length > 0){
          unpairedDevices.map(async(item) => {
           data.bssid2 = item.id
           await axios.post('http://192.168.43.114:8000/addPeer', data)
          .then(response => {
           this.setState({
            reply : response.data
          })
          if(response.data === 0){
         this.LocalNotification();
          }
          else if(response.data === 1){
          Alert.alert("you are near to carona +ve patient")
          }
          else if(response.data === 2){
            Alert.alert("you are near to carona suspect")
          }
        })
        .catch(err => {
          console.log(err +err.response);
        });
        console.log("peer added")

        const data1 = {
          'lat' :this.state.latitude,
          'long' : this.state.longitude,
        }
        console.log(data1)

        await axios.post('http://192.168.43.114:8000/updateGPS', data1)
        .then(response => {
        console.log(response.data);
        
      })
      .catch(err => {
        console.log(err +err.response);
      });
      console.log("peer added")



        })
      }

  

     
  };

  cancelDiscovery = () => async () => {
    try {
      await BluetoothSerial.cancelDiscovery();
      this.setState({ scanning: false });
    } catch (e) {
      Toast.showShortBottom(e.message);
    }
  };

  toggleDevicePairing = async ({ id, paired }) => {
    if (paired) {
      await this.unpairDevice(id);
    } else {
      await this.pairDevice(id);
    }
  };
  
 	LocalNotification = () => {
  PushNotification.localNotification({
    autoCancel: true,
    bigText:
      'This is local notification demo in React Native app. Only shown, when expanded.',
    subText: 'Local Notification Demo',
    title: 'Local Notification Title',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]'
  })
}

  render() {
   const { isEnabled, device, devices, scanning, processing } = this.state;
   
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topBar}>
          <Text style={styles.heading}>Bluetooth</Text>
          <View style={styles.enableInfoWrapper}>
            <Text style={{ fontSize: 14, color: "#fff", paddingRight: 10 }}>
              {isEnabled ? "ON" : "OFF"}
            </Text>
            <Switch onValueChange={this.toggleBluetooth} value={isEnabled} />
          </View>
        </View>
        
        
       </SafeAreaView>
    );
  }
}

export default withSubscription({ subscriptionName: "events" })(App);
