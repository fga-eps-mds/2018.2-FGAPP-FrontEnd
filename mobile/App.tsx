import * as React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform, BackHandler } from 'react-native';

import {StackNavigator} from 'react-navigation'

import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import TabHandler from './screens/TabHandler'
import { Notifications, Permissions, Constants } from 'expo';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducers from './screens/tab_navigator/indica_ai/reducers';

const store = createStore(rootReducers)

// Importing config variables
require('./env-config');

export default class App extends React.Component<{}> {

  async componentDidMount() {
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
