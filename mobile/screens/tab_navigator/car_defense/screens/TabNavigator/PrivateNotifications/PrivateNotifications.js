import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Button,
  Alert  
} from 'react-native';


export default class PrivateNotifications extends Component {
  

  constructor (props) {
    super(props);
    this.state = {
      token: '',
      title: 'Algo de errado no seu carro!',
      message: ''
    }
  }

  handlePlate = (text) => {
    this.setState({id: text})
  }

  handleMessage = (text) => {
      this.setState({title: text})   
  }


  onPressButton = event => {
    const url = ``

    let notification = JSON.stringify({
      id: this.state.id,
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
    }
    ).catch(error => {
      console.log(error)
    })

  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.header}>Informações</Text>
          <Text style={styles.header2}> Usuário</Text>
          <TextInput
            style={styles.input2}
            placeholderTextColor="#c8cdea"
            placeholder="Digite a placa"
            underlineColorAndroid="transparent"
            onChangeText={this.handlePlate}
          />
          <Text style={styles.header3}>Descrição</Text>
          <TextInput
            style={styles.input1}
            placeholderTextColor="#c8cdea"
            placeholder="Descreva o ocorrido"
            multiline={true}
            maxLength={255}
            underlineColorAndroid="transparent"
            onChangeText={this.handleMessage}
          />
        </View>
        <View style={styles.container1}>
          <Button title="Enviar"
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

});

