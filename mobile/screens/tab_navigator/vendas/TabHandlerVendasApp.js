/*
    Tab navigator between offers, seller products and ordered products.
*/

import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import MyProducts from './screens/MyProducts';
import OfferScreen from './screens/OfferScreen';
import OrderScreen from './screens/OrderScreen';

const TabHandlerVendasApp = new TabNavigator({
    OfferScreen: {
        screen: OfferScreen,
        navigationOptions: {
            tabBarLabel: 'Ofertas',
            params: {numero:40}
            //params: {token: this.props.navigation.params ? this.props.navigation.params.product : undefined}
        }
    },
    MyProducts: {
        screen: MyProducts,
        navigationOptions: {
            tabBarLabel: 'Meus produtos',
            headerLeft: null,
        }
    },
    OrderScreen: {
        screen: OrderScreen,
        navigationOptions: {
            tabBarLabel: 'Pedidos',
            headerLeft: null,
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
