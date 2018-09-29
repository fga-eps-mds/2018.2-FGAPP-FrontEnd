import React, { Component } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Button } from 'react-native';
import Expo from 'expo';

async function getToken() {
  // Remote notifications do not work in simulators, only on device
  if (!Expo.Constants.isDevice) {
    return;
  }
  let { status } = await Expo.Permissions.askAsync(
    Expo.Permissions.NOTIFICATIONS,
  );
  if (status !== 'granted') {
    return;
  }
  let value = await Expo.Notifications.getExpoPushTokenAsync();
  console.log('Our token', value);
  /// Send this to a server
}

export default class RegisterCar extends Component {
    componentDidMount () {
        token = getToken()
    }

    constructor (props) {
        super(props);
        this.state = {
          token: token,
          carPlate: ''
        }
      }

      handlePlate = (text) => {
          this.setState({ carPlate: text })
      }

      onPressButton = () => {
        const url = ``

        let notification = JSON.stringify({
          carPlate: this.state.carPlate
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
                <View style={styles.container}>
                    <Text style={styles.header}> Cadatrar carro</Text>
                    <TextInput
                        style={styles.input2}
                        placeholderTextColor="#c8cdea"
                        placeholder="Placa do carro"
                        underlineColorAndroid="transparent"
                        onChangeText={this.handlePlate}                    
                    />
                </View>
                <View style={styles.container1}>
                    <Button 
                        title="Cadastrar"
                        color="#5c68c3"
                        onPress={this.onPressButton}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
    container1: {
      marginTop: 100
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
      marginTop: 30,
    },

  });