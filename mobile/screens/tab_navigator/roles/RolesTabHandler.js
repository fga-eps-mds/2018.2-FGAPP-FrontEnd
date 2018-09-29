import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

import {TabNavigator} from 'react-navigation'
import RolesConfirmadosNavigator from './screens/TabNavigator/rolesConfirmados/RolesConfirmadosNavigator'
import CadastroNavigator from './screens/TabNavigator/cadastroEventos/CadastroNavigator'
import FeedNavigator from './screens/TabNavigator/feed/FeedNavigator'

import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';

const RolesTabStackNavigator = new TabNavigator({
    FeedNavigator:{
        screen:FeedNavigator,
        navigationOptions:{
            tabBarLabel:'Feed',
            tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='newspaper' size={27} style={{ color: tintColor }} />
        }
    },
    RolesConfirmadosNavigator:{
        screen:RolesConfirmadosNavigator,
        navigationOptions:{
            tabBarLabel:'RolesConfirmados',
            tabBarIcon: ({ tintColor }) => <MaterialIcons name='event-available' size={27} style={{ color: tintColor }} />
        }
    },
    CadastroNavigator:{
        screen: CadastroNavigator,
        navigationOptions:{
            tabBarLabel:'CadastroEventos',
            tabBarIcon: ({ tintColor }) => <MaterialIcons name='playlist-add' size={27} style={{ color: tintColor }} />
        }
    },
}, {
    headerMode: 'none',                         // I don't want a NavBar at top
    tabBarPosition: 'bottom',                   // So your Android tabs go bottom
    tabBarOptions: {
      activeTintColor: 'limegreen',             // Color of tab when pressed
      inactiveTintColor: '#b5b5b5',             // Color of tab when not pressed
      showIcon: 'true',                         // Shows an icon for both iOS and Android
      showLabel: (Platform.OS !== 'android'),   // No label for Android
      labelStyle: {
        fontSize: 11,
      },
      style: {
        backgroundColor: '#fff',                // Makes Android tab bar white instead of standard blue
      }
    },
});

class RolesTabHandler extends Component {

    render() {
        return (
            <RolesTabStackNavigator/>
        );
    }
}
export default RolesTabHandler;