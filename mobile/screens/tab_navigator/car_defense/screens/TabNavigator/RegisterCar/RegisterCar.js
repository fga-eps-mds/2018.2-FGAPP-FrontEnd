import React, { Component } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Alert, FlatList, RefreshControl } from 'react-native';
// import Expo from 'expo'
// import { Permissions, Notifications } from 'expo'
import jwt_decode from 'jwt-decode';

// var tk
// async function register() {
//   const { status } = await Expo.Permissions.askAsync(
//     Expo.Permissions.NOTIFICATIONS
//   );
//   if (status != 'granted') {
//     alert('You need to enable permissions in settings');
//     return;
//   }

//   const value = await Expo.Notifications.getExpoPushTokenAsync();
//   tk = value;
//   console.log(status, value);
// }

// async function list() {
//   const { status: existingStatus } = await Permissions.getAsync(
//     Permissions.NOTIFICATIONS
//   );
//   let finalStatus = existingStatus;

//   // only ask if permissions have not already been determined, because
//   // iOS won't necessarily prompt the user a second time.
//   if (existingStatus !== 'granted') {
//     // Android remote notification permissions are granted during the app
//     // install, so this will only ask on iOS
//     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//     finalStatus = status;
//   }

//   // Stop here if the user did not grant permissions
//   if (finalStatus !== 'granted') {
//     return;
//   }
//   var value
//   var tk = await Promise
//     .resolve(value = await Notifications.getExpoPushTokenAsync())
//     .then(x => value);
//   return tk;

// }


export default class RegisterCar extends Component {


  constructor(props) {
    super(props);
    this.state = {
      plate: '',
      model: '',
      color: '',
      hasError: false,
      errorMessage: '',
      // registered: false,
      // registerMessage: '',
      refreshing: false
    };
  }

  handlePlate = (text) => {
    this.setState({ plate: text })
  }

  handleModel = (text) => {
    this.setState({ model: text })
  }

  handleColor = (text) => {
    this.setState({ color: text })
  }

  async componentDidMount() {
    this.setState({ hasError: false, errorMessage: '' })
    const { state } = this.props.navigation;
    var token = state.params ? state.params.token : undefined;
    user = jwt_decode(token)
    let link = 'http://192.168.0.4:8003/car/?token=' + user.user_id

    return fetch(link)
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

    if (this.state.plate.length < 8) {
      this.setState({ hasError: true, errorMessage: 'Insira uma placa válida: AAA-0000' })
    }

    else {
      this.setState({ hasError: false, errorMessage: '' })
      const { state } = this.props.navigation;
      var token = state.params ? state.params.token : undefined;
      user = jwt_decode(token)

      const url = 'http://192.168.0.4:8003/car/' //cars db models url

      let notification = JSON.stringify({
        id_token: user.user_id,
        plate: this.state.plate,
        model: this.state.model,
        color: this.state.color
      })

      console.log(notification)

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
        // this.setState({ registered: true, registerMessage: 'Veículo cadastrado!' })
        Alert.alert('Veículo cadastrado!')
      }
      ).catch(error => {
        console.log(error)
      })

    }
  }

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <View style={styles.container}>
          <Text style={styles.header}> Cadastrar carro</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#858DC7"
            placeholder="Placa do carro"
            underlineColorAndroid="transparent"
            maxLength={8}
            onChangeText={this.handlePlate}
          />
          {this.state.hasError ? <Text style={{ color: '#E62C00', paddingLeft: 35 }}>{this.state.errorMessage}</Text> : null}
          <TextInput
            style={styles.input}
            placeholderTextColor="#858DC7"
            placeholder="Modelo do carro (opcional)"
            underlineColorAndroid="transparent"
            onChangeText={this.handleModel}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#858DC7"
            placeholder="Cor do carro (opcional)"
            underlineColorAndroid="transparent"
            onChangeText={this.handleColor}
          />
        </View>
        <View style={styles.container1}>
          <TouchableOpacity
            style={styles.button}
            color="#5c68c3"
            onPress={this.onPressButton}
            containerViewStyle={{ width: '40%' }}
          >
            <Text style={{ color: 'white' }} >Cadastrar</Text>
          </TouchableOpacity>
          {/* {this.state.registered ? <Text style={{ flexDirection: 'row', justifyContent: 'center', color: '#5c68c3', marginTop: 20 }}>{this.state.registerMessage}</Text> : null } */}

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
    color: '#5c68c3'
  },
  button: {
    backgroundColor: "#c8cdea",
    borderRadius: 15,
    height: 40,
    width: 121,
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