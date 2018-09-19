import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  ActivityIndicator,
  Text,
  Alert,
  StyleSheet,
  AppRegistry,
  TextInput,
  Button,
} from 'react-native';

export default class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
        username: '', email: '', password1: '', password2: '',
        field_style_1: false, field_style_2: false, field_style_3: false, field_style_4: false,
        field_alert_1: [], field_alert_2: [], field_alert_3: [], field_alert_4: [], non_field_alert: []
      };
  }

  _onPressButton = async () => {
      // Coloque seu ip aqui
      fetch('http://192.168.1.11:8000/api/rest-auth/registration/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        'username': this.state.username,
        'email': this.state.email,
        'password1': this.state.password1,
        'password2': this.state.password2,
      }),
  })
  .then((response) => response.json())
  .then((responseJson) => {
    //Campo 1
   if (responseJson.username != undefined){
     Alert.alert('Campo 1');
     this.setState({ field_alert_1: responseJson.username})
     this.setState({ field_style_1: true })
    }
    else{
      this.setState({ field_style_1: false })
    }
    //Campo 2

    //Campo 3
    if (responseJson.password1 != undefined){
      Alert.alert('Campo 3');
      this.setState({ field_alert_3: responseJson.password1})
      this.setState({ field_style_3: true })
    }
    else{
      this.setState({ field_style_3: false })
    }
    //Campo 4
    if(responseJson.password2 != undefined){
      Alert.alert('Campo 4');
      this.setState({ field_alert_4: responseJson.password2})
      this.setState({ field_style_4: true })
    }
    else{
      this.setState({ field_style_4: false })
    }
    //Sem campo
    if (responseJson.non_field_errors != undefined){
      Alert.alert('Erro sem campo');
      this.setState({ field_alert_4: responseJson.non_field_errors})
    }

    //Sucesso
   if (responseJson.token != undefined){
        Alert.alert("Conta criada com sucesso!");
      }
   })
      .catch((error) => {
        console.error(error);
      });
  }

  render(){
    var field1, field2, field3, field4;

    //Campo1
    if (this.state.field_style_1){ // clicked button style
      field1 = {
          height: 50,
          backgroundColor: '#F78181',
          borderColor: 'red',
          borderWidth: 2,
      }
    }
    else{ // default button style
      field1 = {
          height: 50,
          borderWidth: 2,
      }
    }
    //Campo2
    if (this.state.field_style_2){ // clicked button style
      field2 = {
          height: 50,
          backgroundColor: '#F78181',
          borderColor: 'red',
          borderWidth: 2,
      }
    }
    else{ // default button style
      field2 = {
          height: 50,
          borderWidth: 2,
      }
    }
    //Campo3
    if (this.state.field_style_3){ // clicked button style
      field3 = {
          height: 50,
          backgroundColor: '#F78181',
          borderColor: 'red',
          borderWidth: 2,
      }
    }
    else{ // default button style
      field3 = {
          height: 50,
          borderWidth: 2,
      }
    }
    //Campo4
    if (this.state.field_style_4){ // clicked button style
      field4 = {
          height: 50,
          backgroundColor: '#F78181',
          borderColor: 'red',
          borderWidth: 2,
      }
    }
    else{ // default button style
      field4 = {
          height: 50,
          borderWidth: 2,
      }
    }
    return(
     <View style={{paddingTop: 50, paddingLeft: 30 }}>
     <Text> Cadastro </Text>
     <View style={{height: 20}} />
     <TextInput
           style={field1}
            placeholder="Insira seu username"

            onChangeText={(username) =>  this.setState({username})}
      />
      <View style={{height: 20}} />
      <TextInput
             style={field2}
             placeholder="Insira seu email"
             onChangeText={(email) =>  this.setState({email})}
       />
       <View style={{height: 20}} />
      <TextInput
            style={field3}
             placeholder="Insira sua senha"
             secureTextEntry
             onChangeText={(password1) => this.setState({password1})}
       />
       <View style={{height: 20}} />
       <TextInput
             style={field4}
              placeholder="Confirme sua senha"
              secureTextEntry
              onChangeText={(password2) => this.setState({password2})}
        />
        <View style={{height: 20}} />
       <Button
             onPress={this._onPressButton}
             title="Cadastro"
       />

  </View>
    );
  }
}

const styles = StyleSheet.create({
    input_style: {
        height: 50,
        //borderColor: 'black',
        borderWidth: 2,
    },
    bad_input: {
        height: 50,
        backgroundColor: '#F78181',
        borderColor: 'red',
        borderWidth: 2,
    }
});
