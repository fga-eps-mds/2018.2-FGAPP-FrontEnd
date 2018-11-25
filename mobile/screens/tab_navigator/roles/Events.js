import React, {Component} from 'react'
import {StackNavigator} from 'react-navigation'

import Feed from './screens/TabNavigator/feed/Feed'
import Profile from './screens/EventProfile/Profile'
import Comments from './screens/EventComments/Comments'

const Events = new StackNavigator({
    Feed:{
      screen:Feed,
      navigationOptions: {
        tabBarLabel: 'Feed de Eventos',
        headerLeft: null,
      },
    },
    Profile:{
      screen:Profile,
      navigationOptions: {
        tabBarLabel: 'Profile de Eventos',
      },
    },
    Comments:{
      screen:Comments,
      navigationOptions: {
        tabBarLabel: 'Comentários',
      },
    },
  },
  { headerMode: 'none' }
);

export default Events;