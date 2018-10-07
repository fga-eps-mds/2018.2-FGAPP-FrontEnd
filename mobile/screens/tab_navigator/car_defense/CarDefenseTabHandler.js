import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { TabNavigator } from 'react-navigation'
import Feed from './screens/Feed'
import PublicNotifications from './screens/TabNavigator/PublicNotifications/PublicNotifications'
import PrivateNotifications from './screens/TabNavigator/PrivateNotifications/PrivateNotifications'
import RegisterCar from './screens/TabNavigator/RegisterCar/RegisterCar'
import PrivateFeed from './screens/TabNavigator/PrivateFeed/PrivateFeed'
import { Icon } from 'native-base';


const CarDefenseTabHandler = new TabNavigator({
    Feed: {
        screen: Feed,
        navigationOptions: {
            tabBarLabel: 'Feed',
            tabBarIcon: ({ focused }) => (
                <Icon
                    type='FontAwesome'
                    name="home"
                    style={{ color: '#5c68c3', fontSize: 16 }}
                />
            ),
            headerLeft: null,
        }
    },

    PrivateNotifications: {
        screen: PrivateNotifications,
        navigationOptions: {
            tabBarLabel: 'Notificação',
            tabBarIcon: ({ focused }) => (
                <Icon
                    type='FontAwesome'
                    name="send-o"
                    style={{ color: '#5c68c3', fontSize: 15 }}
                />
            ),
            headerLeft: null,
        }
    },
    PublicNotifications: {
        screen: PublicNotifications,
        navigationOptions: {
            tabBarLabel: 'Alerta',
            tabBarIcon: ({ focused }) => (
                <Icon
                    type='FontAwesome'
                    name="warning"
                    style={{ color: '#5c68c3', fontSize: 15 }}
                />
            ),
            headerLeft: null,
        }
    },
    RegisterCar: {
        screen: RegisterCar,
        navigationOptions: {
            tabBarLabel: 'Carros',
            tabBarIcon: ({ focused }) => (
                <Icon
                    type='FontAwesome'
                    name="car"
                    style={{ color: '#5c68c3', fontSize: 15 }}

                />
            ),
            headerLeft: null,
        }
    },
    PrivateFeed: {
        screen: PrivateFeed,
        navigationOptions: {
            tabBarLabel: 'Feed Privado',
            tabBarIcon: ({ focused }) => (
                <Icon
                    type='FontAwesome'
                    name="bell-o"
                    style={{ color: '#5c68c3', fontSize: 15 }}
                />
            ),
            headerLeft: null,
        }
    },
},
    {
        tabBarOptions: {
            showLabel: true,
            showIcon: true,
            swipeEnabled: true,
            activeTintColor: 'black',
            inactiveTintColor: '#5c68c3',
            labelStyle: {
                fontSize: 5,
            },
            tabStyle: {
                height: 65,
            },
            style: {
                backgroundColor: '#fff',
            },
            animationEnabled: true,
        },

    });


export default CarDefenseTabHandler;