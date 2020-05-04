import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation'
import {createDrawerNavigator} from 'react-navigation-drawer';
import homeStack from './homeStack';

import Scanning from '../screens/Scanning';
import Register from '../screens/Register';


const screens ={
    Home:{
        screen: homeStack,
    },
    Scanning:{
        screen: Scanning,
    },
    Register:{
        screen: Register,
    },


}

const MyDrawerNavigator = createDrawerNavigator(
    screens, {
    initialRouteName: 'Home',
    drawerWidth: 300,
    drawerPosition: 'left',
    
        
}
);

const AppContainer = createAppContainer(MyDrawerNavigator);

export default class DrawerNavigator extends Component{
    render(){
        return <AppContainer/>
    }
}
