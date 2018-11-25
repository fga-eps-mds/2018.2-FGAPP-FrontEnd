import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ImageBackground,
    Image,
    KeyboardAvoidingView,
    TouchableOpacity,
    Linking,
    Keyboard,
} from "react-native";
import {Button} from 'native-base';
import Field from './components/Field';
import styles from './tab_navigator/vendas/styles';
import LoginButton from './components/LoginButton';
import SignUpButton from './components/SignUpButton';
import ResetPasswordButton from './components/ResetPasswordButton';
import Login from './components/Login';
import jwt_decode from 'jwt-decode'
import { onSignIn } from "../AuthMethods";
import ToogleView from './tab_navigator/vendas/screens/my_products/ToogleView';

const LOGIN_BACKGROUND_IMAGE = 'https://i.imgur.com/dvhebUS.png';
const LOGO_IMAGE = 'https://i.imgur.com/F7PTwBg.png';

async function getExpoToken(loginToken) {
  const { status } = await Expo.Permissions.askAsync(
    Expo.Permissions.NOTIFICATIONS
  );
  if (status != 'granted') {
    alert('Você precisa permitir notificações nas configurações.');
    return;
  }

  const notificationToken = await Expo.Notifications.getExpoPushTokenAsync();
  storeToken(loginToken, notificationToken)
}

async function storeToken(loginToken, notificationToken){
  var user = jwt_decode(loginToken);

  const notification_path = `${process.env.VENDAS_API}/api/save_user_token/`;
  fetch(notification_path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'user_token': notificationToken,
      'user_id': user.user_id,
      'token': loginToken,
    }),
  }).catch( err => {
    console.log(err)
  });
}

class LoginScreen extends Component {

  constructor(props) {
      super(props);
      this.state = {
        isButtonsHidden: false,
        email: '', password: '',
        email_field_is_bad: false, password_field_is_bad: false,
        email_field_alerts: [''], password_field_alerts: [''], non_field_alert: ['']
      };
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = (event) => {
    this.setState({ isButtonsHidden: true });
  }

  _keyboardDidHide = (event) => {
    this.setState({ isButtonsHidden: false });
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });
}

  termsOfUse = () => {
    Linking.canOpenURL('https://github.com/fga-eps-mds/2018.2-FGAPP-FrontEnd/blob/indica-ai-app/195-homologation-environment/mobile/TERMS_OF_USE.md').then(supported => {
      if (supported) {
        Linking.openURL('https://github.com/fga-eps-mds/2018.2-FGAPP-FrontEnd/blob/indica-ai-app/195-homologation-environment/mobile/TERMS_OF_USE.md');
      } else {
        console.log("Don't know how to open TERMS OF USE");
      }
    });
  }

  checkJson(responseJson){
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
   if (responseJson.token != undefined || responseJson.key != undefined){
     getExpoToken(responseJson.token);
     onSignIn(responseJson.token);
     this.props.navigation.navigate('TabHandler', {token:responseJson.token})
   }
  }

  _onPressButton = async () => {
   login = await Login(this.state.email, this.state.password)
   this.checkJson(login);
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
              <ToogleView hide={this.state.isButtonsHidden}>
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
              </ToogleView>
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
        );
    }
}
export default LoginScreen;
