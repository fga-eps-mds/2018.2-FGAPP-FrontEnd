import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
} from "react-native";

import {Button} from 'native-base'

import HomeScreen from './screens/HomeScreen'
import {StackNavigator} from 'react-navigation'
import RolesTabHandler from './RolesTabHandler'

export default class RolesApp extends Component {

    render() {
        return (
            <RolesStackNavigator/>
        );
    }
}

const RolesStackNavigator = StackNavigator({
    RolesTabHandler:{
        screen:RolesTabHandler,
        navigationOptions: ({ navigation }) => ({
          header: null,
        }),
    },
})

//Cor limegreen principal do app
// #32CD32