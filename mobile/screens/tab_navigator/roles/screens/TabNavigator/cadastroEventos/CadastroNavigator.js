import React, { Component } from "react";
import {StackNavigator} from 'react-navigation'


import CadastroEventos1 from './CadastroEventos1'
import CadastroEventos2 from './CadastroEventos2'


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
    },
    CadastroEventos2: {
        screen: CadastroEventos2,
    },
})