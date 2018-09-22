import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {StackNavigator} from 'react-navigation'

import WelcomeScreen from './screens/WelcomeScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import TabStackNavigator from './screens/TabHandler'



export default class App extends React.Component<{}> {
  render() {
    return (
      < AppStackNavigator />
    );
  }
}

const AppStackNavigator = new StackNavigator({

  WelcomeScreen:{
    screen:WelcomeScreen,
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
    screen:TabStackNavigator,
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
