import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import RegisterLocal from './containers/RegisterLocal';
import ListLocals from './containers/ListLocals'
import SearchScreen from './screens/SearchScreen';

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
  Favorites : {
    screen: ListLocals,
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
