import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert,
} from "react-native";

class Profile extends Component {
  constructor(props) {
      super(props);
      this.state = {
        url:'http://'+process.env.REACT_NATIVE_PACKAGER_HOSTNAME+':8000',
      }
  }

  _onPressButton = async () => {
      // Coloque seu ip aqui
      fetch(this.state.url+'/api/rest-auth/logout/', {
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
