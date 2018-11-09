import * as React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform, BackHandler } from 'react-native';

import {StackNavigator} from 'react-navigation'

import { RootNavigator } from './src/Routes';
import { isSignedIn } from "./src/AuthMethods";



export default class App extends React.Component<{}> {
  state = {
    signed: false,
    signLoaded: false,
  }
  componentWillMount(){
    isSignedIn()
    .then(res => this.setState({ signed: res, signLoaded: true }))
    .catch(err => alert("Erro"));
  }
  
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
    const { signLoaded, signed } = this.state;

    if (!signLoaded) {
      return null;
    }

    const Layout = RootNavigator(signed);
    return <Layout />;
  }
}
