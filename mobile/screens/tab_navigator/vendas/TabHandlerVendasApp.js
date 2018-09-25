/*
    Tab navigator between offers, seller products and ordered products.
*/

import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import MyProducts from './screens/MyProducts';
import Offers from './screens/Offers';
import OrderedProducts from './screens/OrderedProducts';
import CreateProduct from './screens/CreateProduct';

const MyProductStackNavigator = new StackNavigator({
    MyProducts:{
      screen: MyProducts,
      navigationOptions: {
        header: null,
      }
    },
    CreateProduct:{
      screen: CreateProduct,
      navigationOptions: {
        header: null,
      }
    }
});

const TabStackNavigator = new TabNavigator({
    Offers: {
        screen: Offers,
        navigationOptions: {
            tabBarLabel: 'Ofertas',
        }
    },
    MyProductStackNavigator: {
      screen: MyProductStackNavigator,
      navigationOptions: {
          tabBarLabel: 'My Products',
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

class TabHandlerVendasApp extends Component {
    render() {
        return (
            <TabStackNavigator />
        );
    }
}

export default TabHandlerVendasApp;
