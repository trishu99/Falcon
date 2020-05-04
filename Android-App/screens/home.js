import React, { useState, Component } from 'react';

import { StyleSheet,ScrollView, Text, View, Button, FlatList, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import Icon from 'react-native-vector-icons/FontAwesome'

export default class Home extends Component{
    static navigationOptions= ({ screenProps}) => ({
        title :'Home',
        headerLeft:() => (
            <Icon name="menu" size={40} color='#333' onPress={() => screenProps.openDraw()}/>
          

        )
    })
    constructor(props){
        super(props);

        this.state={
           reply : 1      
        }
    }
    
    runconti(){
        const {navigation} = this.props;
        console.log(this.state.reply);
        const r = navigation.getParam('reply');
        const val = navigation.getParam('login');
        console.log(val)
        if(r !== undefined){
            this.state.reply = r;
        }

        console.log(r);
    }
    async componentDidMount() {
       //this.timer = setInterval(()=> this.runconti(), 5000)
    }
   /* componentDidUpdate(prevProps) {
        console.log("mahima see")
        const {navigation} = this.props;
        console.log(this.state.reply);
        const r = navigation.getParam('reply');
        const val = navigation.getParam('login');
        console.log(val)
        if(r !== undefined){
            console.log("seee this")
            this.state.reply = r;
        }
            //const name = navigation.getParam('login');
        console.log(r);
        console.log(this.state.reply)
        console.log("above is the val of reply")
        if (prevProps.reply !== this.props.reply) {
            console.log("mahima you are")
            // Use the `this.props.isFocused` boolean
          // Call any action
        }
        this.render();
        
      }*/
    

render(){
    console.log("hmmm")
    const goreal = () =>{
        this.props.navigation.navigate('Scanning')
    }
    const godetect = () =>{
        this.props.navigation.navigate('Register')
        this.state.reply = this.props.navigation.getParam('reply');
    }
    const {navigation} = this.props;
    console.log(this.state.reply);
    const r = navigation.getParam('reply');
    const val = navigation.getParam('login');

   
    return(
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
        <View style={styles.container}>
            <ScrollView>
            <View>
                <Text style={styles.header}>Falcon</Text>
                {this.state.reply === 1 &&
            	  <TouchableOpacity onPress={godetect}>
                <Text style={styles.detect}>Register</Text>
                </TouchableOpacity>
                }
                <TouchableOpacity onPress={goreal}>
                <Text style={styles.real}>Scanning</Text>
                </TouchableOpacity>

   
              

            </View>
   
          </ScrollView>
            </View>
            </TouchableWithoutFeedback>
          
    )
    
        }
}

const styles = StyleSheet.create({    
    container: {
        flex : 1,
        backgroundColor: '#ddd'
    },
    header:{
        textAlign:'center',
        fontSize: 40,
        paddingTop: 10,
        paddingBottom: 20,
    },
    term:{
        flex:1,
        backgroundColor:'lightblue',
        padding: 20,
        fontSize: 30,
        textAlign: 'center',
    },
    run:{
        flex:1,
        backgroundColor:'#b0ada4',
        padding: 20,
        fontSize: 30,
        textAlign: 'center', 
    },
    share:{
        flex:1,
        backgroundColor:'#99ff66',
        padding: 20,
        fontSize: 30,
        textAlign: 'center',
    },
    real:{
        flex:1,
        backgroundColor:'#80aaff',
        padding: 20,
        fontSize: 30,
        textAlign: 'center',
    },
    consoles:{
        flex:1,
        backgroundColor:'#ff99ff',
        padding: 20,
        fontSize: 30,
        textAlign: 'center',
    },
    detect:{
        flex:1,
        backgroundColor:'#c1f0f0',
        padding: 20,
        fontSize: 30,
        textAlign: 'center',
    },
    titleText: {
        fontFamily: 'nunito-bold',
        fontSize: 18,
        color: '#333',
    },
});
