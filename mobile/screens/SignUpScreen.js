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
import ConfirmSignUpBtn from './components/ConfirmSignUpBtn';
import styles from './tab_navigator/vendas/styles';

const LOGIN_BACKGROUND_IMAGE = 'https://i.imgur.com/dvhebUS.png';
const LOGO_IMAGE = 'https://i.imgur.com/F7PTwBg.png';

export default class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
        email: '', password: '', cookie:'',
        email_field_is_bad: false, password_field_is_bad: false,
        email_field_alerts: [''], password_field_alerts: [''], non_field_alerts: []
      };
  }

  _onPressButton = async () => {

      var registration_path = `${process.env.INTEGRA_LOGIN_AUTH}/api/registration/`;
      fetch(registration_path,{
        method: 'POST',
        credentials: 'include',
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
    console.log(responseJson);
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
   if (responseJson.token != undefined ||
       responseJson.key != undefined){
        Alert.alert("Conta criada com sucesso!");
        this.props.navigation.navigate('LoginScreen') //mudei aqui de WelcomeScreen pra LoginScreen
      }
   })

   .catch( err => {
     if (typeof err.text === 'function') {
       err.text().then(errorMessage => {
         this.props.dispatch(displayTheError(errorMessage))
       });
     } else {
       Alert.alert("Erro na conexão.");
       console.log(err)
     }
   });
  }

  render(){
    return(
      <KeyboardAvoidingView behavior="padding">
        <ImageBackground
          style={styles.imageBackgrd}
          imageStyle={{resizeMode: 'stretch'}}
          source={{
            uri: LOGIN_BACKGROUND_IMAGE
          }}
        >
        <View style={styles.logoView}>
          <View style={styles.logoViewSet}>
            <Image source={{uri: LOGO_IMAGE}} style={styles.logoImage} />
          </View>
          <View style={styles.formStyle}>

             <Field
              style={styles.fieldStyle}
              placeholder={"Email"}
              badInput={this.state.email_field_is_bad}
              fieldAlert={this.state.email_field_alerts}
              keyExtractor={'email'}
              onChangeText={(email) => this.setState({email})}
             />

             <Field
              style={styles.fieldStyle}
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
          <View style={styles.signUp}>
            <ConfirmSignUpBtn onPress={this._onPressButton}/>
          </View>
        </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}
