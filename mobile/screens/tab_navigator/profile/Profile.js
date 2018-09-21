import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
} from "react-native";

class Profile extends Component {
  constructor(props) {
      super(props);
  }

  _onPressButton = async () => {
      // Coloque seu ip aqui
      fetch('http://192.168.1.18:8000/api/rest-auth/logout/', {
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
      this.props.navigation.navigate('WelcomeScreen')
    }
  })}
    render() {
        return (
            <View style={styles.container}>
            <Button
                  onPress={this._onPressButton}
                  title="Sair"
            />
            </View>
        );
    }
}
export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
