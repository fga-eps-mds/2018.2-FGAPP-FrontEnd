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
import Settings from './tab_navigator/settings/Settings';

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
            )
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
            )
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
            )
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
            )
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            tabBarLabel: 'Configurações',
            headerLeft: null,
            tabBarIcon: ({ focused }) => (
                <Icon
                    name="md-settings"
                    style={{ color: focused ? '#BD1C5F' : '#5A5A5A' }}
                />
            )
        }
    },
}, {
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
        style: {
            backgroundColor: '#171717',
        },
        tabStyle: {
            height: 60,
        },
    },
    animationEnabled: true,
});

export default TabHandler;
