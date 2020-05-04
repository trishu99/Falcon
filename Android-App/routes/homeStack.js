import React, {Component} from 'react';


import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator, DrawerActions} from 'react-navigation-drawer';

import Home from '../screens/home';
import Scanning from '../screens/Scanning';
import Register from '../screens/Register';

const screens = {
    Home: {
        screen: Home, 
    },
     Scanning :{
        screen: Scanning
    },
    Register:{
        screen: Register
    },
  
}

const HomeStack = createStackNavigator(screens, {
    initialRouteName: 'Home',
    defaultNavigationOptions:{
        headerStyle:{height: 55, backgroundColor: '#80aaff'},
        headerTitleStyle: {fontWeight: 'bold', color:'white'}
    }
});

const AppContainer = createAppContainer(HomeStack);

export default class homeStack extends Component{
    render(){
        return <AppContainer screenProps={{openDraw: () => this.props.navigation.dispatch(DrawerActions.openDrawer())}}/>
    }
}

//export default createAppContainer(HomeStack); 

