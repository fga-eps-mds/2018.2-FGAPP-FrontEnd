import React, { Component } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    FlatList,
    Alert,
} from "react-native";
import Field from './components/Field';

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
      var login_path = `${process.env.INTEGRA_LOGIN_AUTH}/login/`;
      fetch('http://5babadabecc1a70014306b40.mockapi.io/api/rest-auth/login', {
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
   /*if (responseJson.username != undefined){
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
         responseJson.key != undefined){*/
     this.props.navigation.navigate('Settings', {token:responseJson.token})
      //}
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
        return (
            <View style={{paddingTop: 50, paddingLeft: 30, paddingRight: 30}}>
              <Text>Login</Text>
              <Field
               placeholder={"Email"}
               badInput={this.state.email_field_is_bad}
               fieldAlert={this.state.email_field_alerts}
               keyExtractor={'username'}
               onChangeText={(email) => this.setState({email})}
              />

              <Field
               placeholder={"Senha"}
               badInput={this.state.password_field_is_bad}
               fieldAlert={this.state.password_field_alerts}
               keyExtractor={'password'}
               onChangeText={(password) => this.setState({password})}

               secureTextEntry
              />

              <Button title='Login' onPress={this._onPressButton}/>
              <View style={{height: 20}} />
              <FlatList
                  data={this.state.non_field_alert}
                  renderItem={({item}) => <Text style ={{color: 'red'}}>{item}</Text>}
                  keyExtractor={item => 'non_field_errors'}

                />
            </View>
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
