import React, { Component } from 'react';
import { TouchableOpacity, View, ActivityIndicator, Text, Alert} from 'react-native';
import { AppRegistry, TextInput } from 'react-native';
export default class App extends Component {

  constructor(props) {
      super(props);
      this.state = {email: '', password: ''};
  }

  handlePress = async () => {
      fetch('http://192.168.43.75:8000/api/signup', {
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
   //Alert.alert("Token:  " + responseJson.token);
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

      <TouchableOpacity onPress={this.handlePress.bind(this)}>
       <Text style={{paddingTop: 50, paddingLeft: 50, color: '#FF0000'}}> Click me to register </Text>
      </TouchableOpacity>

  </View>
    );
  }
}
