import React, { Component } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Alert, FlatList, RefreshControl } from 'react-native';
import Expo from 'expo'
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

async function list() {
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
    .resolve(token = await Notifications.getExpoPushTokenAsync())
    .then(x => token);
  return tk;

}


export default class RegisterCar extends Component {
  componentWillMount() {
    register();
    list();
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
      plate: '',
    },
      this.state = {
        refreshing: false,
      };

  }

  handlePlate = (text) => {
    this.setState({ plate: text })
  }

  async componentDidMount() {
    let token = await list();
    let url = 'http://68.183.28.199:8005/carprofiles/?token=' + token

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
    this.setState({ refreshing: true });
    this.componentDidMount().then(() => {
      this.setState({ refreshing: false });
    });
  }


  onPressButton = () => {
    const url = `http://68.183.28.199:8005/carprofiles/`//car profiles db models url

    let notification = JSON.stringify({
      notification_token: tk,
      plate: this.state.plate,
    })

    fetch(url, {
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

  }


  render() {
    return (
      <ScrollView>
        <View style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <Text style={styles.header}> Cadastrar carro</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#c8cdea"
            placeholder="Placa do carro"
            underlineColorAndroid="transparent"
            onChangeText={this.handlePlate}
          />
        </View>
        <View style={styles.container1}>
          <TouchableOpacity
            style={styles.button}
            color="#5c68c3"
            onPress={this.onPressButton}
            containerViewStyle={{ width: '40%' }}
          >
            <Text style={{ color: 'white' }} >Placa</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container1}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) => {
              return (
                <View style={styles.item2}>
                  <Text style={styles.text1}>{item.plate}</Text>
                </View>

              );
            }}
            keyExtractor={({ id }, index) => id}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  container1: {
    marginTop: 80,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  header: {
    color: '#5c68c3',
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 50,
    marginTop: 25
  },
  header2: {
    color: '#5c68c3',
    textAlign: 'left',
    paddingLeft: 20,
    paddingTop: 35,
    fontWeight: '100',
    fontSize: 30,
  },
  input: {
    width: 300,
    height: 30,
    borderBottomWidth: 1,
    alignSelf: 'center',
    textAlign: 'left',
    borderBottomColor: '#5c68c3',
    marginTop: 70,
  },
  button: {
    backgroundColor: "#c8cdea",
    borderRadius: 15,
    height: 40,
    width: 120,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
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
  text1: {
    color: "#5c68c3",
    fontWeight: 'bold',
  }
});
