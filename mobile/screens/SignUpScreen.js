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
  FlatList,
} from 'react-native';
import Field from './components/Field';

export default class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
        email: '', password: '',
        email_field_is_bad: false, password_field_is_bad: false,
        email_field_alerts: [''], password_field_alerts: [''], non_field_alerts: []
      };
  }

  _onPressButton = async () => {
      // Coloque seu ip aqui
      fetch('http://192.168.1.18:8000/api/rest-auth/registration/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        'email': this.state.email,
        'password1': this.state.password,
        'password2': this.state.password,
      }),
  })
  .then((response) => response.json())
  .then((responseJson) => {
    console.log(JSON.stringify(responseJson));
    //Campo de email
    if (responseJson.email != undefined){
      this.setState({ email_field_alerts: responseJson.email})
      this.setState({ email_field_is_bad: true })
    }
    else{
      this.setState({ email_field_alerts: ['']})
      this.setState({ email_field_is_bad: false })
    }
    //Campo de password
    if (responseJson.password1 != undefined){
      this.setState({ password_field_alerts: responseJson.password1})
      this.setState({ password_field_is_bad: true })
    }
    else{
      this.setState({ password_field_alerts: ['']})
      this.setState({ password_field_is_bad: false })
    }
    //Sem campo
    if (responseJson.non_field_errors != undefined){
      this.setState({ non_field_alert: responseJson.non_field_errors})
    }
    else{
      this.setState({ non_field_alert: ['']})
    }
    //Sucesso
   if (responseJson.key != undefined){
        Alert.alert("Conta criada com sucesso!");
        this.props.navigation.navigate('WelcomeScreen')
      }
   })
      .catch((error) => {
        console.error(error);
      });
  }

  render(){
    return(
     <View style={{paddingTop: 50, paddingLeft: 30 , paddingRight: 30}}>
     <Text> Cadastro </Text>
     <View style={{height: 20}} />

       <Field
        placeholder={"Email"}
        badInput={this.state.email_field_is_bad}
        fieldAlert={this.state.email_field_alerts}
        keyExtractor={'email'}
        onChangeText={(email) => this.setState({email})}
       />

       <Field
        placeholder={"Senha"}
        badInput={this.state.password_field_is_bad}
        fieldAlert={this.state.password_field_alerts}
        keyExtractor={'password1'}
        onChangeText={(password) => this.setState({password})}
        secureTextEntry
       />

       <Button
             onPress={this._onPressButton}
             title="Cadastro"
       />
       <View style={{height: 20}} />
       <FlatList
           data={this.state.non_field_alert}
           renderItem={({item}) => <Text>{item}</Text>}
           keyExtractor={item => 'non_field_errors'}
         />

  </View>
    );
  }
}
