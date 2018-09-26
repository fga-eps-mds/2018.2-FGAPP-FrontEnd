import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

import HomeScreen from './screens/HomeScreen'
import CadastroEventos1 from './screens/TabNavigator/cadastroEventos/CadastroEventos1'
import CadastroEventos2 from './screens/TabNavigator/cadastroEventos/CadastroEventos2'
import Feed from './screens/TabNavigator/Feed'
import {StackNavigator} from 'react-navigation'
import RolesTabHandler from './RolesTabHandler'
import * as firebase from 'firebase'


export default class RolesApp extends Component {

    componentWillMount() {
        var config = {
            apiKey: "AIzaSyAHz3Y9yDmb4Pk5rvp6vdgTZscweubgTC8",
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
    CadastroEventos1:{
        screen:CadastroEventos1,
        navigationOptions:{
            header:null
        },
    },
    CadastroEventos2:{
        screen:CadastroEventos2,
        navigationOptions:{
            header:null
        },
    },
    Feed: {
        screen: Feed,
        navigationOptions:{
            header:null
        },
    },
    
})

//Cor limegreen principal do app
// #32CD32