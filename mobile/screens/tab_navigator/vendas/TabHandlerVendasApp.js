/*
    Tab navigator between offers, seller products and ordered products.
*/

import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import MyProductsScreen from './screens/MyProductsScreen';
import OfferScreen from './screens/OfferScreen';
import OrderScreen from './screens/OrderScreen';

const TabHandlerVendasApp = new TabNavigator({
    OfferScreen: {
        screen: OfferScreen,
        navigationOptions: {
            tabBarLabel: 'Ofertas',
        }
    },
    MyProductsScreen: {
      screen: MyProductsScreen,
      navigationOptions: {
          tabBarLabel: 'Meus Produtos',
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
