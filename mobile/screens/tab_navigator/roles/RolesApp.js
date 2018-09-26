import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

import HomeScreen from './screens/HomeScreen'
import CadastroEventosScreen from './screens/TabNavigator/CadastroEventosScreen'
import Feed from './screens/TabNavigator/Feed'
import {StackNavigator} from 'react-navigation'
import RolesTabHandler from './RolesTabHandler'
import * as firebase from 'firebase'


export default class RolesApp extends Component {

    componentWillMount() {
        var config = {
            apiKey: "AIzaSyANZUGzes8WS0ffMGQsTCMItcJH2K7THjc",
            authDomain: "react-native-roles.firebaseapp.com",
            databaseURL: "https://react-native-roles.firebaseio.com",
            projectId: "react-native-roles",
            storageBucket: "react-native-roles.appspot.com",
            messagingSenderId: "348737140329"
        };
        firebase.initializeApp(config);        
    }

    render() {
        return (
            <RolesStackNavigator />
        );
    }
}

const RolesStackNavigator = new StackNavigator({
    RolesTabHandler:{
        screen:RolesTabHandler,
        navigationOptions: ({ navigation }) => ({
          header: null,
        }),
    },
    HomeScreen:{
        screen:HomeScreen,
        navigationOptions: {
            header: null
        }
    },
    CadastroEventosScreen:{
        screen:CadastroEventosScreen,
        navigationOptions:{
            header:null
        },
    },
    Feed: {
        screen: Feed,
    },
    
})

//Cor limegreen principal do app
// #32CD32