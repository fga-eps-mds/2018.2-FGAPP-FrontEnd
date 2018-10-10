import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert,
    Image,
} from "react-native";
import {
  List,
  ListItem,
  Thumbnail,
  Content,
  Body,
  Container,
  Left,
  Right,
  Icon
} from 'native-base';
import {StackNavigator, createStackNavigator} from 'react-navigation'
import UserCard from './../../components/UserCard'
import jwt_decode from 'jwt-decode'

class Settings extends Component {

_onPressButton = async () => {
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
  if(responseJson.detail=="Successfully logged out."){
    console.log(JSON.stringify('Log OUT'));
    this.props.navigation.state.params.token = null
    this.props.navigation.navigate('LoginScreen')

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
    var token = state.params ? state.params.token : undefined;
    var jwtDecode = require('jwt-decode');
    var user = jwt_decode(token);
      return (
        <Container style= {{backgroundColor: "transparent", opacity: 1}}>
          <Content>
            <List>
              <ListItem noIndent style={{paddingTop: 20, paddingLeft: '5%', paddingRight: '5%', paddingBottom: 20, borderBottomWidth:0, backgroundColor: 'white'}} >
                <Left style={{alignItems: 'center'}}>
                  <Thumbnail large source={{uri: 'https://www.logolynx.com/images/logolynx/03/039b004617d1ef43cf1769aae45d6ea2.png'}}/>
                  <Body>
                    <Text style={{fontSize: 20, fontWeight: '500'}}>
                      Name
                    </Text>
                    <Text style={{fontSize: 15}}>
                      Email
                    </Text>
                  </Body>
                </Left>
                <Right>
                    <Icon style={{fontSize: 25}} name="arrow-forward" />
                </Right>
              </ListItem>
            </List>
          </Content>
        </Container>              
      );
  }
}
export default Settings;
