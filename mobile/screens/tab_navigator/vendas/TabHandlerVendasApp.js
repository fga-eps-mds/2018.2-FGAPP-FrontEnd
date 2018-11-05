/*
    Tab navigator between offers, seller products and ordered products.
*/

import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import MyProducts from './screens/MyProducts';
import Offers from './screens/Offers';
import OrderedProducts from './screens/OrderedProducts';

const TabHandlerVendasApp = new TabNavigator({
    Offers: {
        screen: Offers,
        navigationOptions: {
            tabBarLabel: 'Ofertas',
        }
    },
    MyProducts: {
        screen: MyProducts,
        navigationOptions: {
            tabBarLabel: 'Meus produtos',
        }
    },
    OrderedProducts: {
        screen: OrderedProducts,
        navigationOptions: {
            tabBarLabel: 'Pedidos',
        }
    }
},
{
    tabBarOptions: {
        showLabel: true,
        showIcon: false,
        labelStyle: {
            fontSize: 10,
        },
        tabStyle: {
            height: 40,
        },
        style: {
            backgroundColor: '#5A5A5A',
        },
    },
});

export default TabHandlerVendasApp;
