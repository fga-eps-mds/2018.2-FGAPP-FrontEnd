import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Permissions, Notifications } from 'expo'


async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }
  var token
  var tk = await Promise
    .resolve (token = await Notifications.getExpoPushTokenAsync())
    .then(x => token);
  return tk;
  

}

export default class Feed extends React.Component {

  componentWillMount() {
    
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
    this.state = {
      refreshing: false,
    };
  }


  async componentDidMount() {
    let token = await registerForPushNotificationsAsync();
    let url = 'http://68.183.28.199:8002/notifications/?token=' + token

    return fetch(url)
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
    this.setState({refreshing: true});
    this.componentDidMount().then(() => {
      this.setState({refreshing: false});
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
          keyExtractor={({ id }, index) => id.toString()}
          
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
    alignItems: 'center',
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
    color: "#5c68c3",
    fontWeight: '100'
  },
  text1: {
    color: "#5c68c3",
    fontWeight: '200',
  }
});
