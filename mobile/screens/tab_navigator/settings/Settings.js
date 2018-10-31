import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert,
    Image,
} from "react-native";
import {StackNavigator, createStackNavigator} from 'react-navigation'
import jwt_decode from 'jwt-decode'

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: process.env.INTEGRA_LOGIN_AUTH,
    }
}

_onPressButton = async () => {

    fetch(this.state.url+'/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
    }),
})
.then((response) => response.json())
.then((responseJson) => {
  console.log(JSON.stringify(responseJson.detail));
  if(responseJson.detail=="Successfully logged out."){
    console.log(JSON.stringify('Log OUT'));
    this.props.navigation.state.params.token = null
    this.props.navigation.navigate('WelcomeScreen')

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
   const {state} = this.props.navigation;
   var token = state.params ? state.params.token : "<undefined>";
   var jwtDecode = require('jwt-decode');
   var user = jwt_decode(token);
     return (
       <View style={{flex: 1, flexDirection: 'column'}}>
         <View style={{ height: '90%', flex: 1, flexDirection: 'row'}}>
           <View>
           <Image
             style={{width: 100, height: 100}}
             source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
           />
           </View>
           <View>
           <Text> {"<Nome de Usuário>"}</Text>
           <Text>{user.email}</Text>
           </View>
         </View>
         <View style={{ height: '10%'}}>
           <Button
                   onPress={this._onPressButton}
                   title="Sair"
             />
           </View>
         </View>
       );
      return (<Text>asd</Text>);
  }
}
export default Settings;
