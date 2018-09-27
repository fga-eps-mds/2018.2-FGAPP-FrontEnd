/*
    Tab navigator between offers, seller products and ordered products.
*/

import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import MyProductStackNavigator from './screens/MyProductsScreen';
import Offers from './screens/Offers';
import OrderedProducts from './screens/OrderedProducts';

const TabHandlerVendasApp = new TabNavigator({
    Offers: {
        screen: Offers,
        navigationOptions: {
            tabBarLabel: 'Ofertas',
            headerLeft: null,
        }
    },
    MyProductStackNavigator: {
      screen: MyProductStackNavigator,
      navigationOptions: {
          tabBarLabel: 'Meus Produtos',
      }
    },
    OrderedProducts: {
        screen: OrderedProducts,
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
