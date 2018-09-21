import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

import HomeScreen from './screens/HomeScreen'
import CadastroEventosScreen from './screens/CadastroEventosScreen'

import {StackNavigator} from 'react-navigation'

export default class RolesApp extends Component {
    render() {
        return (
            <RolesStackNavigator />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const RolesStackNavigator = new StackNavigator({

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
        }
    }
})

//Cor limegreen principal do app
// #32CD32