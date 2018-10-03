import React, { Component } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    FlatList,
    Alert,
    ImageBackground,
    Image,
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
        return (
            <ImageBackground
              style={{ width: '100%', height: '100%' }}
              imageStyle={{resizeMode: 'stretch'}}
              source={{
                uri: 'https://i.imgur.com/dvhebUS.png'
              }}
              >
              <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 150 }}>
                  <Image source={{uri: 'https://logodownload.org/wp-content/uploads/2017/04/instagram-logo-1.png'}} style={{width:350, height: 99}} />
                </View>
                <View style={{paddingTop: 50, paddingLeft: 20, paddingRight: 20}}>
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
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Button title='ENTRAR' onPress={this._onPressButton} title="ENTRAR" color='white'/>
                </View>
                <View style= {{alignItems: 'center', justifyContent: 'center', paddingTop: 5}}>
                  <Button title='CADASTRAR' onPress={() => this.props.navigation.navigate('SignUpScreen')} color='transparent'/>
                </View>

              </View>
            </ImageBackground>
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
