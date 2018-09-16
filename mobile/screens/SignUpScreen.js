import React, { Component } from 'react';
import { TouchableOpacity, View, ActivityIndicator, Text, Alert} from 'react-native';
import { AppRegistry, TextInput, Button } from 'react-native';
export default class App extends Component {

  constructor(props) {
      super(props);
      this.state = {email: '', password: ''};
  }

  _onPressButton = async () => {
      fetch('http://192.168.0.52:8000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        'email': this.state.email,
        'password': this.state.password
      }),
  })
  .then((response) => response.json())
  .then((responseJson) => {
   Alert.alert(responseJson.error);
   if (responseJson.token != undefined){
        Alert.alert("Conta criada com sucesso!");
      }
   })

      .catch((error) => {
        console.error(error);
      });
  }

  render(){
    return(
     <View style={{paddingTop: 50, paddingLeft: 30 }}>
     <Text> SignUp </Text>
     <TextInput
            style={{height: 40}}
            placeholder="Insert Email"
            onChangeText={(email) =>  this.setState({email})}
      />
      <TextInput
             style={{height: 40}}
             placeholder="Insert Password here"
             secureTextEntry
             onChangeText={(password) => this.setState({password})}
       />

       <Button
             onPress={this._onPressButton}
             title="Sign Up!"
       />

  </View>
    );
  }
}
