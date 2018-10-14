import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

import {TabNavigator} from 'react-navigation'
import Feed from './screens/Feed'
import PublicNotifications from './screens/TabNavigator/PublicNotifications/PublicNotifications'
import PrivateNotifications from './screens/TabNavigator/PrivateNotifications/PrivateNotifications'
import RegisterCar from './screens/TabNavigator/RegisterCar/RegisterCar'
import PrivateFeed from './screens/TabNavigator/PrivateFeed/PrivateFeed'

import { Platform } from 'react-native';

const CarDefenseTabStackNavigator = new TabNavigator({
    Feed:{
        screen:Feed,
        navigationOptions:{
            tabBarLabel:'Feed',
            headerLeft: null,
        }
    },

    PrivateNotifications:{
        screen:PrivateNotifications,
        navigationOptions:{
            tabBarLabel:'Notificações',
            headerLeft: null,
        }
    },
    PublicNotifications:{
        screen:PublicNotifications,
        navigationOptions:{
            tabBarLabel:'Alertas',
            headerLeft: null,
        }
    },
    RegisterCar:{
        screen:RegisterCar,
        navigationOptions:{
            tabBarLabel:'Carros',
            headerLeft: null,
        }
    },
    PrivateFeed:{
        screen:PrivateFeed,
        navigationOptions:{
            tabBarLabel:'Feed',
            headerLeft: null,
        }
    },
}, 
{ 
    tabBarOptions: {
        showLabel: true,
        showIcon: false,
        labelStyle: {
            fontSize: 10,
            color: '#5c68c3'
        },
        tabStyle: {
            height: 40,
        },
        style: {
            backgroundColor: '#fff',
        },
    },
   
});

class CarDefenseTabHandler extends Component {

    render() {
        return (
            <CarDefenseTabStackNavigator/>
        );
    }
}
export default  CarDefenseTabHandler;