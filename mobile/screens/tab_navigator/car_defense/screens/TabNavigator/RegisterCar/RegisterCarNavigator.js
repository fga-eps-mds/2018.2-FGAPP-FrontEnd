import React, { Component } from "react";
import {StackNavigator} from 'react-navigation'

import RegisterCar from './RegisterCar'


export default class RegisterCarNavigator extends Component {

    render() {
        return (
            <RegisterCarStackNavigator />
        );
    }
}

const RegisterCarStackNavigator = new StackNavigator({

    RegisterCar: {
        screen: RegisterCar,
        navigationOptions: ({ navigation }) => ({
            header: null,
        }),
    },
})