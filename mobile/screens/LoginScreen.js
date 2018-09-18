import React, { Component } from 'react';
import { TouchableOpacity, View, ActivityIndicator, Text, Alert, StyleSheet, AppRegistry, TextInput, Button} from 'react-native';

class LoginScreen extends Component {

  constructor(props) {
      super(props);
      this.state = {email: '', password: ''};
  }

  _onPressButton = async () => {
      fetch('http://192.168.0.52:8000/api/signin', {
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
        this.props.navigation.navigate('TabHandler')
      }
   })

      .catch((error) => {
        console.error(error);
      });
  }

    render() {
        return (
            <View style={{paddingTop: 50, paddingLeft: 30 }}>
                <Text> SignIn </Text>
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
                        title="Sign In!"
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
