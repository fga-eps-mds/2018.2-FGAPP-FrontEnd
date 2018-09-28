import React, { Component } from "react";
import {StackNavigator} from 'react-navigation'

import CadastroEventos1 from './CadastroEventos1'
import CadastroEventos2 from './CadastroEventos2'
import FetchApi from './FetchApi'

export default class CadastroNavigator extends Component {

    render() {
        return (
            <CadastroStackNavigator />
        );
    }
}

const CadastroStackNavigator = new StackNavigator({

    CadastroEventos1: {
        screen: CadastroEventos1,
        navigationOptions: ({ navigation }) => ({
            header: null,
        }),
    },
    CadastroEventos2: {
        screen: CadastroEventos2,
    },
    FetchApi: {
        screen: FetchApi,
    }
})