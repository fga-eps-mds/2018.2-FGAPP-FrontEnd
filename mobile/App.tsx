import * as React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform, BackHandler } from 'react-native';

import {StackNavigator} from 'react-navigation'

import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import TabHandler from './screens/TabHandler'

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducers from './screens/tab_navigator/indica_ai/reducers';

const store = createStore(rootReducers)

// Importing config variables
require('./env-config');

export default class App extends React.Component<{}> {
  componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
      return true;
  }

  render() {
    return (
        <Provider store={store}>
            < AppStackNavigator/>
       </Provider>
    );
  }
}

const AppStackNavigator = new StackNavigator({
  LoginScreen:{
    screen:LoginScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,

    }),
  },
  SignUpScreen:{
    screen:SignUpScreen,
    navigationOptions: {
        headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 },
        headerTintColor: 'white',
    }
  },
  TabHandler:{
    screen:TabHandler
  },
},
{
  cardStyle: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
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
