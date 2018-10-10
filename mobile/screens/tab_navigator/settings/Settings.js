import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
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
import jwt_decode from 'jwt-decode'

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      photo: ''
    }
  }

  componentDidMount() {
    const { state } = this.props.navigation;
    var token = state.params ? state.params.token : undefined;
    var jwtDecode = require('jwt-decode');
    var user = jwt_decode(token);

    this.setState({email: user.email});
  }

  // Will be done on another screen
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
    return (
      <Container style={styles.container}>
        <Content>
          <List>
            <ListItem noIndent style={styles.cardItem} >
              <Left style={{ alignItems: 'center' }}>
                <Thumbnail
                  large
                  source={{ uri:'https://www.logolynx.com/images/logolynx/03/039b004617d1ef43cf1769aae45d6ea2.png' }}
                />
                <Body>
                  <Text style={styles.name}>
                    Name
                  </Text>
                  <Text style={styles.email}>
                    {this.state.email}
                  </Text>
                </Body>
              </Left>
              <Right>
                <Icon name='arrow-forward' style={styles.icon} />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }

}
export default Settings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    opacity: 1
  },
  cardItem: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: '5%',
    paddingRight: '5%',
    borderBottomWidth: 0,
    backgroundColor: 'white'
  },
  name: {
    fontSize: 20, fontWeight: '500'
  },
  email: {
    fontSize: 15
  },
  icon: {
    fontSize: 25
  }
});