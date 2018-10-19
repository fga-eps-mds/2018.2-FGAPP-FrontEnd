import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text, Form, Item , Label, Input } from 'native-base';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: 0,
      name: '',
      email: '',
      photo: '',
    };
  }

  _clickPhoto = async () => {
    Alert.alert('Voce Clicou na foto. Parabéns');
  }
  _editProfile = async () => {
    const logout_path = `${process.env.INTEGRA_LOGIN_AUTH}/api/logout/`;
    fetch(logout_path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'user_id': this.state.user_id,
        'name': this.state.name,
        'email': this.state.email,
        'photo': this.state.photo,
      }),
    })
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      //Json retorna com erro
      if (responseJson.error != undefined){
        Alert.alert(responseJson.error);
      }
      //Json retorna sem erro
      else{
        Alert.alert('Json sem erro');
      }
    })
    .catch((err) => {
      Alert.alert('Erro interno, não foi possível se comunicar com o servidor.');
    })
  }
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
        <View style={{margin:5}}>
          <Card style={{height:150, paddingRight:10}}>
            <CardItem style={{height:'100%'}}>
              <Body>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                  <TouchableOpacity onPress={this._clickPhoto} style={styles.view_circle}>
                    <View>
                      <Image
                        source={{ uri: 'http://res.cloudinary.com/demo/image/upload/w_150,h_100,c_fill/sample.jpg' }}
                        style={{width: 100, height: 100, borderRadius:100, position: 'absolute'}}
                      />
                      <Image
                        source={{uri: 'https://i.imgur.com/gr7Zvft.png'}}
                        style={styles.image_circle}
                      />
                    </View>
                  </TouchableOpacity>
                  <View>
                    <Item stackedLabel>
                      <Label style={{fontSize: 12}}>Nome:</Label>
                      <Input
                        style={{fontSize: 12}}
                        placeholder={'Nome'}
                      />
                    </Item>
                    <Item stackedLabel>
                      <Label style={{fontSize: 12}}>Email</Label>
                      <Input
                        style={{fontSize: 12}}
                        placeholder={'email@email.com'}
                      />
                    </Item>
                  </View>
                </View>
              </Body>
            </CardItem>
          </Card>
        </View>
        <View style={{margin:5}}>
          <Button
            color='#BD1C5F'
            onPress={this._editProfile}
            title="Salvar"
          />
        </View>
        <View style={{margin:5}}>
          <Button
            color='#BD1C5F'
            onPress={this._logout}
            title="Sair"
          />
        </View>
      </View>
    );
  }
}
export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  backgroundImage: {
    flex: 1,
    position: 'relative'
  },
  image_circle: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
    borderRadius:100,
    //backgroundColor:'transparent',
  },
  view_circle: {
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
    borderRadius:10,
    borderWidth: 1,
    borderColor:'rgba(0,0,0,0.2)',
    borderRadius: 100/2,
  },
});
