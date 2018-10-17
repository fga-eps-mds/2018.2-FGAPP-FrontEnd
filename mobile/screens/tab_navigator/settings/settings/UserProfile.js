import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Button
} from 'react-native';

class UserProfile extends Component {
  _logout = async () => {
    const logout_path = `${process.env.INTEGRA_LOGIN_AUTH}/api/logout/`;
    fetch(logout_path, {
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
        if (responseJson.detail == 'Successfully logged out.') {
          console.log(JSON.stringify('Log OUT'));
          this.props.navigation.state.params.token = null
          this.props.navigation.navigate('LoginScreen')

        }
      })
      .catch(err => {
        if (typeof err.text === 'function') {
          err.text().then(errorMessage => {
            this.props.dispatch(displayTheError(errorMessage))
          });
        } else {
          Alert.alert('Erro na conexão.');
          console.log(err)
        }
      });
  }

  render() {
    const { state } = this.props.navigation;
    var token = state.params ? state.params.token : undefined;
    const userInfo = state.params ? state.params.userInfo : undefined;

    return (
      <View style={styles.container}>
        <Button
          color='#BD1C5F'
          onPress={this._logout}
          title="Sair"
        />
      </View>
    );
  }
}
export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});