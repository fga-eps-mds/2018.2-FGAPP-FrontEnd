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
  FlatList,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import Cookie from 'react-native-cookie';
import {Button} from 'native-base';
import Field from './components/Field';
import SingUp from './components/SingUp';

export default class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
        email: '', password: '', cookie:'',
        email_field_is_bad: false, password_field_is_bad: false,
        email_field_alerts: [''], password_field_alerts: [''], non_field_alerts: []
      };
  }

  checkJson(responseJson){
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
    if (responseJson.token != undefined || responseJson.key != undefined){
        Alert.alert("Conta criada com sucesso!");
        this.props.navigation.navigate('LoginScreen') //mudei aqui de WelcomeScreen pra LoginScreen
    }
  
  }

  _onPressButton = async () => {
    register = await SingUp(this.state.email, this.state.password)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.checkJson(responseJson);
      //Campo de email
    })
  }

  render(){
    return(
      <KeyboardAvoidingView behavior="padding">
        <ImageBackground
          style={{ width: '100%', height: '100%' }}
          imageStyle={{resizeMode: 'stretch'}}
          source={{
            uri: 'https://i.imgur.com/dvhebUS.png'
          }}
        >
        <View style={{flex: 1, flexDirection: 'column',  justifyContent: 'space-evenly'}}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image source={{uri: 'https://i.imgur.com/F7PTwBg.png'}} style={{width:1000/4, height: 561/4}} />
          </View>
          <View style={{paddingLeft: '5%', paddingRight: '5%'}}>

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
             <FlatList
                 data={this.state.non_field_alert}
                 renderItem={({item}) => <Text style ={{color: 'red'}}>{item}</Text>}
                 keyExtractor={item => 'non_field_errors'}
               />
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center', paddingLeft: '35%', paddingRight: '35%'}}>
            <Button light block onPress={this._onPressButton}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>CADASTRAR</Text>
            </Button>
          </View>
        </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}
