import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, ScrollView, RefreshControl } from 'react-native';

import { Permissions, Notifications } from 'expo'

var tk

async function register() {
  const { status } = await Expo.Permissions.askAsync(
    Expo.Permissions.NOTIFICATIONS
  );
  if (status != 'granted') {
    alert('You need to enable permissions in settings');
    return;
  }

  const token = await Expo.Notifications.getExpoPushTokenAsync();
   tk = token;
  console.log(status, token);
}

export default class Feed extends React.Component {
  componentWillMount() {
    register();
    this.listener = Expo.Notifications.addListener(this.listen);
  }
  componentWillUnmount() {
    this.listener && Expo.Notifications.addListener(this.listen);
  }

  listen = ({ origin, data }) => {
    console.log('cool data', origin, data);
  }

  constructor(props) {
    super(props);
    this.state = { refreshing: false, }
  }


  async componentDidMount() {

    let notification = JSON.stringify({
      token: tk
    })

    fetch(process.env.CARDEFENSE_PROFILE + '/set_notification_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: notification
    }).then(response => { return response.json() }
    ).then(jsonResponse => {
      console.log(jsonResponse);
    }
    ).catch(error => {
      console.log(error)
    })

    return fetch(process.env.CARDEFENSE_NOTIFICATIONS + '/emergencynotifications/')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function () {

        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.componentDidMount().then(() => {
      this.setState({ refreshing: false });
    });
  }
  render() {
    return (
      <ScrollView style={styles.item}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => {
            return (
              <View style={styles.item2}>
                <Text style={styles.text1}>{item.title}</Text>
                <Text style={styles.text}>{item.message}</Text>
              </View>
            );
          }}
          keyExtractor={({ id }, index) => id}

        />
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#ffffff",
    flexGrow: 1,
    margin: 4,
    padding: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    elevation: 4
  },
  item2: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    flexGrow: 1,
    margin: 4,
    padding: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    elevation: 4
  },
  text: {
    color: "#5c68c3"
  },
  text1: {
    color: "#5c68c3",
    fontWeight: 'bold',
  }
});