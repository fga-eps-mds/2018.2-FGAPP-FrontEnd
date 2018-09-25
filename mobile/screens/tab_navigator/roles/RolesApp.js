import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

import HomeScreen from './screens/HomeScreen'
import CadastroEventosScreen from './screens/CadastroEventosScreen'
import Login from './screens/user/Login'
import Register from './screens/user/Register'
import Feed from './screens/Feed'
import {StackNavigator} from 'react-navigation'
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
    Login: {
        screen: Login,
    },
    Register: {
        screen: Register,
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