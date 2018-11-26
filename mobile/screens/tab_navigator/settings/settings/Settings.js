import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  BackHandler,
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
import { getUserToken } from "../../../../AuthMethods";

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileInfo: {
        token: undefined,
        name: '',
        email: '',
        photo: ''
      }
    }
  }
  componentWillMount(){
    getUserToken()
    .then(res => {
      this.setState({ token: res })
      this._loadProfile();
    })
    .catch(err => alert("Erro"));
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
      BackHandler.exitApp();
      return true;
  }
  _loadProfile = async () => {
    const user = jwt_decode(this.state.token);
    const profileInfoPath = `${process.env.INTEGRA_LOGIN_AUTH}/api/users/get_profile/`;
    fetch(profileInfoPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'user_id': user.user_id,
      }),
    })
    .then((response) => { return response.json() })
    .then((responseJson) => {
      if (!responseJson.error) {
        this.setState({ profileInfo: responseJson });
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {

    return (
      <Container style={styles.container}>
        <Content>
          <List>
            <ListItem
              onPress={() => this.props.navigation.navigate('UserProfile', { userInfo: this.state.profileInfo })}
              noIndent
              style={styles.cardItem}
            >
              <Left style={{ alignItems: 'center' }}>
                <Thumbnail
                  large
                  source={{ uri: this.state.profileInfo.photo ? this.state.profileInfo.photo : 'https://www.logolynx.com/images/logolynx/03/039b004617d1ef43cf1769aae45d6ea2.png' }}
                />
                <Body>
                  <Text style={styles.name}>
                    {this.state.profileInfo.name ? this.state.profileInfo.name : 'Nome de Usuário'}
                  </Text>
                  <Text style={styles.email}>
                    {this.state.profileInfo.email}
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
