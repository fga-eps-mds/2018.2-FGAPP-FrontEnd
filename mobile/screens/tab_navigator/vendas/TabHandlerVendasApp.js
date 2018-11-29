/*
    Tab navigator between offers, seller products and ordered products.
*/

import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import MyProductsScreen from './screens/MyProductsScreen';
import OfferScreen from './screens/OfferScreen';
import OrderScreen from './screens/OrderScreen';

const TabHandlerVendasApp = new TabNavigator({
    OfferScreen: {
        screen: OfferScreen,
        navigationOptions: {
            tabBarLabel: 'Ofertas',
            title: 'Ofertas',
        }
    },
    MyProductsScreen: {
      screen: MyProductsScreen,
      navigationOptions: {
          tabBarLabel: 'Meus Produtos',
          title: 'Meus Produtos'
      }

    },
    OrderScreen: {
        screen: OrderScreen,
        navigationOptions: {
            tabBarLabel: 'Pedidos',
            title: 'Pedidos',
        }
    }
},
{
    tabBarOptions: {
        showLabel: true,
        showIcon: false,
        activeTintColor: 'black',
        inactiveTintColor: '#5A5A5A',
        labelStyle: {
            fontSize: 10,
        },
        tabStyle: {
            height: 40,
        },
        style: {
            backgroundColor: 'white',
        },
    },
});

export default TabHandlerVendasApp;
