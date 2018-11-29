import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
} from "react-native";
import {Provider as PaperProvider} from 'react-native-paper';

import {Button} from 'native-base'

import {StackNavigator} from 'react-navigation'
import RolesTabHandler from './RolesTabHandler'

export default class RolesApp extends Component {

    render() {
        return (
            <PaperProvider>
                <RolesStackNavigator />
            </PaperProvider>
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