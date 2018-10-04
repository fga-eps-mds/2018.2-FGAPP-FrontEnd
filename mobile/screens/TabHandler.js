import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

import {TabNavigator} from 'react-navigation'
import VendasApp from './tab_navigator/vendas/VendasApp'
import IndicaAiApp from './tab_navigator/indica_ai/IndicaAiApp'
import RolesApp from './tab_navigator/roles/RolesApp'
import CarDefenseApp from './tab_navigator/car_defense/CarDefenseApp'

const TabStackNavigator = new TabNavigator({
    CarDefense:{
        screen:CarDefenseApp,
        navigationOptions:{
            tabBarLabel:'CarDefense',
            tabBarIcon: () => {
            }
        }
    },
    IndicaAi:{
        screen:IndicaAiApp,
        navigationOptions:{
            tabBarLabel:'IndicaAi',
            tabBarIcon: () => {
            }
        }
    },
    Roles:{
        screen:RolesApp,
        navigationOptions:{
            tabBarLabel:'Rolês',
            tabBarIcon: () => {
            }
        }
    },
    Vendas:{
        screen:VendasApp,
        navigationOptions:{
            tabBarLabel:'Vendas',
            tabBarIcon: () => {
            }
        }
    }
})

class TabHandler extends Component {

    render() {
        return (
            <TabStackNavigator/>
        );
    }
}
export default TabHandler;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});