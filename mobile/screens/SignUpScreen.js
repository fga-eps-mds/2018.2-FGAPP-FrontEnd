import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
  FlatList,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import jwt_decode from 'jwt-decode';
import { Button } from 'native-base';
import Field from './components/Field';
import SignUp from './components/SignUp';
import ConfirmSignUpBtn from './components/ConfirmSignUpBtn';
import styles from './tab_navigator/vendas/styles';

const LOGIN_BACKGROUND_IMAGE = 'https://i.imgur.com/dvhebUS.png';
const LOGO_IMAGE = 'https://i.imgur.com/F7PTwBg.png';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '', password: '', cookie: '',
      email_field_is_bad: false, password_field_is_bad: false,
      email_field_alerts: [''], password_field_alerts: [''], non_field_alerts: []
    };
  }

  _updateUserName = async (userID) => {
    const updateProfilePath = `${process.env.INTEGRA_LOGIN_AUTH}/api/users/update_profile/`;
    if (this.state.name == '') {
      this.setState({name: 'Usuário sem nome' });
    }

    fetch(updateProfilePath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'name': this.state.name,
        'user_id': userID
      }),
    })
    .catch((err) => {
      this.setState({ messageError: "Erro interno, não foi possível se comunicar com o servidor." })
      this.setState({ isDialogVisible: true })
    })
  }

  checkJson(responseJson) {
    //Campo de email
    if (responseJson.email != undefined) {
      this.setState({ email_field_alerts: responseJson.email })
      this.setState({ email_field_is_bad: true })
    }
    else {
      this.setState({ email_field_alerts: [''] })
      this.setState({ email_field_is_bad: false })
    }
    //Campo de password
    if (responseJson.password1 != undefined) {
      this.setState({ password_field_alerts: responseJson.password1 })
      this.setState({ password_field_is_bad: true })
    }
    else {
      this.setState({ password_field_alerts: [''] })
      this.setState({ password_field_is_bad: false })
    }
    //Sem campo
    if (responseJson.non_field_errors != undefined) {
      this.setState({ non_field_alert: responseJson.non_field_errors })
    }
    else {
      this.setState({ non_field_alert: [''] })
    }
    //Sucesso
    if (responseJson.token != undefined || responseJson.key != undefined) {
      const user = jwt_decode(responseJson.token);
      const userID = user.user_id;
      this._updateUserName(userID);
      
      Alert.alert("Conta criada com sucesso!");
      this.props.navigation.navigate('LoginScreen') //mudei aqui de WelcomeScreen pra LoginScreen
    }
  }

  _onPressButton = async () => {
    register = await SignUp(this.state.email, this.state.password)
    this.checkJson(register);
  }

  render() {
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