import React, { Component } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    FlatList,
    Alert,
    ImageBackground,
    Image,
    StatusBar,
    KeyboardAvoidingView,
    TouchableOpacity,
    Linking
} from "react-native";
import {Button} from 'native-base';
import Field from './components/Field';
import styles from './tab_navigator/vendas/styles';
import LoginButton from './components/LoginButton';
import SignUpButton from './components/SignUpButton';
import ResetPasswordButton from './components/ResetPasswordButton';

const LOGIN_BACKGROUND_IMAGE = 'https://i.imgur.com/dvhebUS.png';
const LOGO_IMAGE = 'https://i.imgur.com/F7PTwBg.png';

class LoginScreen extends Component {

  constructor(props) {
      super(props);
      this.state = {
        email: '', password: '',
        email_field_is_bad: false, password_field_is_bad: false,
        email_field_alerts: [''], password_field_alerts: [''], non_field_alert: ['']
      };
  }

  _onPressButton = async () => {
      const login_path = `${process.env.INTEGRA_LOGIN_AUTH}/api/login/`;

      fetch(login_path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        'username': this.state.email, //UsernameField foi definido como email
        'password': this.state.password,
      }),
  })
  .then((response) => response.json())
  .then((responseJson) => {
    console.log(JSON.stringify(responseJson));
    //Campo de email
   if (responseJson.username != undefined){
     this.setState({ email_field_alerts: responseJson.username})
     this.setState({ email_field_is_bad: true })
    }
    else{
      this.setState({ email_field_alerts: ['']})
      this.setState({ email_field_is_bad: false })
    }

    //Campo de password
    if (responseJson.password != undefined){
      this.setState({ password_field_alerts: responseJson.password})
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
   if (responseJson.token != undefined||
         responseJson.key != undefined){
     this.props.navigation.navigate('TabHandler', {token:responseJson.token})
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

    render() {
      const password_reset_path = `${process.env.INTEGRA_LOGIN_AUTH}/password_reset/`
        return (
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
                   keyExtractor={'username'}
                   onChangeText={(email) => this.setState({email})}
                  />

                  <Field
                   style={styles.fieldStyle}
                   placeholder={"Senha"}
                   badInput={this.state.password_field_is_bad}
                   fieldAlert={this.state.password_field_alerts}
                   keyExtractor={'password'}
                   onChangeText={(password) => this.setState({password})}
                   secureTextEntry
                  />

                  <FlatList
                      data={this.state.non_field_alert}
                      renderItem={({item}) => <Text style ={{color: 'red'}}>{item}</Text>}
                      keyExtractor={item => 'non_field_errors'}
                  />

                  </View>
              <View>
                <View style={styles.loginContent}>
                  <LoginButton
                   onPress={this._onPressButton}
                  />
                <View style={{padding: 5}}/>
                  <SignUpButton
                   onPress={() => this.props.navigation.navigate('SignUpScreen')}
                  />
                </View>
                <View style={styles.forgotPassword}>
                  <ResetPasswordButton
                   onPress={() => Linking.openURL(password_reset_path)}
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
        );
    }
}
export default LoginScreen;
