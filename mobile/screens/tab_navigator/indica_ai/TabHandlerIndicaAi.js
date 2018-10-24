import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import UserLocationMap from './components/UserLocationMap';
import RegisterLocal from './containers/RegisterLocal';
import ViewLocal from './containers/ViewLocal';
import SearchScreen from './screens/SearchScreen.js'

const TabHandlerIndicaAI = new TabNavigator({

  SearchScreen : {
    screen: SearchScreen,
    navigationOptions: {
      tabBarLabel: 'Buscar Local',
    }
  },
  RegisterLocal : {
    screen: RegisterLocal,
    navigationOptions: {
      tabBarLabel: 'Cadastrar',
    }
  },
  ViewLocal : {
    screen: ViewLocal,
    navigationOptions: {
      tabBarLabel: 'Favoritos',
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

export default TabHandlerIndicaAI;
