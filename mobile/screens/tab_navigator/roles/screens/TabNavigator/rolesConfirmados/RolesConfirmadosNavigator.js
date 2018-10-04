import React, { Component } from "react";
import {StackNavigator} from 'react-navigation'

import RolesConfirmados from './RolesConfirmados'


export default class RolesConfirmadosNavigator extends Component {

    render() {
        return (
            <RolesConfirmadosStackNavigator />
        );
    }
}

const RolesConfirmadosStackNavigator = new StackNavigator({

    RolesConfirmados: {
        screen: RolesConfirmados,
        navigationOptions: ({ navigation }) => ({
            header: null,
        }),
    },
})