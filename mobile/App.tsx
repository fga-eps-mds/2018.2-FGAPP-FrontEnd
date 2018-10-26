import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {StackNavigator} from 'react-navigation'

import WelcomeScreen from './screens/WelcomeScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import TabHandler from './screens/TabHandler'
import IndicaAiApp from './screens/tab_navigator/indica_ai/IndicaAiApp.js';

export default class App extends React.Component<{}> {
  render() {
    return (
      < AppStackNavigator />
    );
  }
}

const AppStackNavigator = StackNavigator({

    WelcomeScreen:{
      screen:IndicaAiApp,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    LoginScreen:{
      screen:LoginScreen
    },
    SignUpScreen:{
      screen:SignUpScreen
    },
    TabHandler:{
      screen:TabHandler,
      navigationOptions: ({ navigation }) => ({
        headerLeft: null,
      }),
    }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
