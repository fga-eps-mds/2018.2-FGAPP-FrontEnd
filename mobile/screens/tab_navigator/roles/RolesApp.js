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


export default class RolesApp extends Component {

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