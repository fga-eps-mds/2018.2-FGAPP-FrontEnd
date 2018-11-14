import React, { Component } from 'react';
import {
    View
} from 'react-native';
import { Icon } from 'native-base';

import { TabNavigator } from 'react-navigation';
import TabHandlerVendasApp from './tab_navigator/vendas/TabHandlerVendasApp';
import IndicaAiApp from './tab_navigator/indica_ai/IndicaAiApp';
import RolesApp from './tab_navigator/roles/RolesApp';
import CarDefenseApp from './tab_navigator/car_defense/CarDefenseApp';
import SettingScreen from './tab_navigator/settings/SettingScreen';

const TabHandler = new TabNavigator({
    Roles: {
        screen: RolesApp,
        navigationOptions: {
            tabBarLabel: 'Eventos',
            headerLeft: null,
            tabBarIcon: ({ focused }) => (
                <Icon
                    name="md-star"
                    style={{ color: focused ? '#1CBD24' : '#5A5A5A' }}
                />
            ),
            headerStyle: {
               backgroundColor:'#1CBD24'
            }
        }
    },
    Vendas: {
        screen: TabHandlerVendasApp,
        navigationOptions: {
            tabBarLabel: 'Vendas',
            tabBarIcon: ({ focused }) => (
                <Icon
                    name="md-cart"
                    style={{ color: focused ? '#0EAC6F' : '#5A5A5A' }}
                />
            ),
            headerStyle: {
               backgroundColor:'#0EAC6F'
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              color: 'white',
              alignSelf: 'center'
            },
        }
    },
    IndicaAi: {
        screen: IndicaAiApp,
        navigationOptions: {
            tabBarLabel: 'IndicaAi',
            headerLeft: null,
            tabBarIcon: ({ focused }) => (
                <Icon
                    name="md-locate"
                    style={{ color: focused ? '#0AACCC' : '#5A5A5A' }}
                />
            ),
            headerStyle: {
               backgroundColor:'#0AACCC'
            }
        }
    },
    CarDefense: {
        screen: CarDefenseApp,
        navigationOptions: {
            tabBarLabel: 'CarDefense',
            headerLeft: null,
            tabBarIcon: ({ focused }) => (
                <Icon
                    name="md-car"
                    style={{ color: focused ? '#5C68C3' : '#5A5A5A' }}
                />
            ),
            headerStyle: {
               backgroundColor:'#5C68C3'
            }
        }
    },
    SettingScreen: {
        screen: SettingScreen,
        navigationOptions: {
            tabBarLabel: 'Configurações',
            title: 'Perfil',
            tabBarIcon: ({ focused }) => (
                <Icon
                    name="md-settings"
                    style={{ color: focused ? '#BD1C5F' : '#5A5A5A' }}
                />
            ),
            headerStyle: {
               backgroundColor:'#BD1C5F'
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
              alignSelf: 'center'
            },

        }
    },
}, {
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
        style: {
            backgroundColor: 'white',
        },
        tabStyle: {
            height: 60,
        },
    },
    animationEnabled: true,
});

export default TabHandler;
