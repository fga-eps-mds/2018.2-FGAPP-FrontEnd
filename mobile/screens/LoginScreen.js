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
import Login from './components/Login';
import jwt_decode from 'jwt-decode'


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
        email: '', password: '',
        email_field_is_bad: false, password_field_is_bad: false,
        email_field_alerts: [''], password_field_alerts: [''], non_field_alert: ['']
      };
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
              style={{ width: '100%', height: '100%' }}
              imageStyle={{resizeMode: 'stretch'}}
              source={{
                uri: 'https://i.imgur.com/dvhebUS.png'
              }}
              >
              <View style={{flex: 1, flexDirection: 'column', paddingTop: '0%', justifyContent: 'space-evenly' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                  <Image source={{uri: 'https://i.imgur.com/F7PTwBg.png'}} style={{width:1000/4, height: 561/4}} />
                </View>
                <View style={{paddingLeft: '5%', paddingRight: '5%'}}>
                  <Field
                   placeholder={"Email"}
                   badInput={this.state.email_field_is_bad}
                   fieldAlert={this.state.email_field_alerts}
                   keyExtractor={'username'}
                   onChangeText={(email) => this.setState({email})}
                  />

                  <Field
                   style={{ paddingBottom: 10, paddingTop: 5}}
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

                  <View style={{alignItems: 'center', justifyContent: 'center', paddingLeft: '35%', paddingRight: '35%'}}>
                    <Button light block onPress={this._onPressButton}>
                      <Text style={{color: 'black', fontWeight: 'bold'}}>ENTRAR</Text>
                    </Button>
                    <View style={{padding: 5}}/>
                    <Button bordered light block onPress={() => this.props.navigation.navigate('SignUpScreen')} color='transparent'>
                      <Text style={{color:  'white', fontWeight: 'bold'}}> CADASTRAR </Text>
                    </Button>
                  </View>

                  <View style={{padding: 5, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={() => Linking.openURL(password_reset_path)}>
                      <Text
                        style={{color:  'white', textDecorationLine: 'underline'}}>
                        Esqueci minha senha
                      </Text>
                    </TouchableOpacity>
                  </View>
                  
                  <View style={{padding: 20, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={ this.termsOfUse }>
                      <Text
                        style={{color:  'black', textDecorationLine: 'underline'}}>
                        Termos de Uso
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </KeyboardAvoidingView>
        );
    }
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});