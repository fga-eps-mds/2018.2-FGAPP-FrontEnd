import * as React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform, BackHandler } from 'react-native';

import {StackNavigator} from 'react-navigation'

import { RootNavigator } from './Routes';
import { isSignedIn } from "./AuthMethods";
import { Notifications, Permissions, Constants } from 'expo';

// Importing config variables
require('./env-config');

export default class App extends React.Component<{}> {
  _isMounted = false;
  state = {
    signed: false,
  }

  async componentDidMount() {
    this._isMounted = true;
    isSignedIn()
    .then(res => {
      if(this._isMounted)
        this.setState({ signed: res })
      
    })

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    const localNotification = {
      title: 'Confira os produtos próximos de você.',
      body: 'Clique para ver ofertas',
      ios: { // (optional) (object) — notification configuration specific to iOS.
        sound: true,
      },
      android:{
      sound: true,
      icon: 'https://res.cloudinary.com/integraappfga/image/upload/v1542241278/IntegraApps_icon.png',
      color: '#1CBD24',
      priority: 'low', // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
      sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
      vibrate: true, // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
      // link (optional) (string) — external link to open when notification is selected.
      }
    };

    let t = new Date();
    if(t.getHours() >= 12 && t.getMinutes() > 30){
      t.setDate(t.getDate()+1); // If it's past lunch time, wait a day
    }
    t.setHours(12, 30, 0, 0);

    const schedulingOptions = {
      time: t, // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
      repeat: 'day',
    };
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (Constants.isDevice && result.status === 'granted') {
      console.log('Notification permissions granted.');
      Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
    }
    else{
      console.log('Notification permissions not granted.');
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
      return true;
  }

  render() {
    const { signed } = this.state;
    const Layout = RootNavigator(signed);
    return <Layout />;
  }
}
