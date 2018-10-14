import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';

export default class PrivateNotifications extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      plate: '',
      title: 'Car Defense',
      message: '',
      image: '',
      hasError: false,
      hasError2: false, 
      errorMessage: '',
      errorMessage2: ''
    }
  }

  handlePlate = (text) => {
    this.setState({ plate: text })
  }

  handleMessage = (text) => {
    this.setState({ message: text })
  }

  onPressButton = () => {
    const url = '' //function send_push_message url

     if (this.state.plate.length < 8) {
      this.setState({ hasError: true, errorMessage: 'Insira uma placa válida: AAA-0000' })
    }

    if (this.state.message.length == 0) {
      this.setState({ hasError2: true, errorMessage2: 'Escreva uma mensagem!' })
    }

    else if (this.state.plate.length == 8) {
      let notification = JSON.stringify({
        plate: this.state.plate,
        title: this.state.title,
        message: this.state.message
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
        Alert.alert("Notificação enviada!")
      }
      ).catch(error => {
        console.log(error)
        Alert.alert("Não foi possível enviar: veículo não cadastrado")
      })
    }

  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.header}>Notificações</Text>
          <Text style={styles.header2}> Placa</Text>
          <TextInput
            style={styles.input2}
            placeholderTextColor="#c8cdea"
            placeholder="Digite a placa"
            underlineColorAndroid="transparent"
            onChangeText={this.handlePlate}
            maxLength={8}
            autoCapitalize="characters"
          />
          {this.state.hasError ? <Text style={{ color: 'red', paddingLeft: 35 }}>{this.state.errorMessage}</Text> : null}
          <Text style={styles.header3}> Descrição</Text>
          <TextInput
            style={styles.input1}
            placeholderTextColor="#c8cdea"
            placeholder="Descreva o ocorrido"
            multiline={true}
            maxLength={100}
            underlineColorAndroid="transparent"
            onChangeText={this.handleMessage}
          />
          {this.state.hasError2 ? <Text style={{ color: 'red', paddingLeft: 35 }}>{this.state.errorMessage2}</Text> : null}
        </View>
        <View style={styles.container1}>
          <TouchableOpacity
            style={styles.button}
            color="#5c68c3"
            onPress={this.onPressButton}
            containerViewStyle={{width: '40%'}}
          >
          <Text style={{color: 'white'}}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {},
  container1: {
    marginTop: 80,
    justifyContent: 'center',
    flexDirection: 'row'
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
  header3: {
    color: '#5c68c3',
    textAlign: 'left',
    paddingLeft: 20,
    paddingTop: 55,
    fontWeight: '100',
    fontSize: 30,
  },
  input1: {
    width: 300,
    height: 30,
    borderBottomWidth: 1,
    alignSelf: 'center',
    textAlign: 'left',
    borderBottomColor: '#5c68c3',
    marginTop: 30,
    textAlignVertical: 'top',
  },
  input2: {
    width: 300,
    height: 30,
    borderBottomWidth: 1,
    alignSelf: 'center',
    textAlign: 'left',
    borderBottomColor: '#5c68c3',
    marginTop: 30,
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

});