import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Card, CardItem, Body, Item, Label, Input } from 'native-base';
import jwt_decode from 'jwt-decode'

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      email: undefined,
      photo: undefined,

    };
  }

  _clickPhoto = async () => {
    const {
      cancelled,
      uri,
    } = await Expo.ImagePicker.launchImageLibraryAsync({ allowsEditing: true, mediaTypes: 'Images', quality: 0.7, base64: true });
    if (!cancelled) {
      this.setState({ photo: uri });
    }
  }
  _editProfile = async () => {
    const { state } = this.props.navigation;
    var token = state.params ? state.params.token : undefined;
    var userInfo = state.params ? state.params.userInfo : undefined;
    var user = jwt_decode(token);

    var name = this.state.name;
    var email = this.state.email;

    const uri = this.state.photo;
    const formData = new FormData();
    const apiUrl = `${process.env.INTEGRA_LOGIN_AUTH}/api/users/update_profile/`;
    formData.append('user_id', user.user_id);
    if((name != undefined))
      formData.append('name', name);

    if((email != undefined))
      formData.append('email', email);

    if(uri != undefined){
      const uriParts = uri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      formData.append('photo', {
        uri,
        name: `photo.${fileType}`,
        type: `application/${fileType}`,
      });
    }

    const options = {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
    fetch(apiUrl, options)
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      // Json retorna com erro
      if (responseJson.error != undefined){
        Alert.alert(responseJson.error);
      }
      // Json retorna sem erro
      else{
        Alert.alert('Informações atualizadas com sucesso.');
        this.props.navigation.navigate('Settings', { token :token });
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
    const userInfo = state.params ? state.params.userInfo : undefined;
    var name = (this.state.name == undefined) ? userInfo.name : this.state.name;
    var email = (this.state.email == undefined) ? userInfo.email : this.state.email;
    var photo = (this.state.photo == undefined) ? userInfo.photo : this.state.photo

    return (
      <View style={styles.container}>
        <View style={{ margin: 5 }}>
          <Card style={{ height: 150, paddingRight: 10 }}>
            <CardItem style={{ height: '100%' }}>
              <Body>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity onPress={this._clickPhoto} style={styles.view_circle}>
                    <View>
                      <Image
                        source={{ uri: photo }}
                        style={{ width: 100, height: 100, borderRadius: 100, position: 'absolute' }}
                      />
                      <Image
                        source={{ uri: 'https://i.imgur.com/gr7Zvft.png' }}
                        style={styles.image_circle}
                      />
                    </View>
                  </TouchableOpacity>
                  <View>
                    <Item stackedLabel>
                      <Label style={{ fontSize: 12 }}>Nome:</Label>
                      <Input
                        style={{ fontSize: 12 }}
                        placeholder={name}
                        onChangeText={(name) => this.setState({name})}
                      />
                    </Item>
                    <Item stackedLabel>
                      <Label style={{ fontSize: 12 }}>Email</Label>
                      <Input
                        style={{ fontSize: 12 }}
                        placeholder={email}
                        onChangeText={(email) => this.setState({email})}
                      />
                    </Item>
                  </View>
                </View>
              </Body>
            </CardItem>
          </Card>
        </View>
        <View style={{ margin: 5 }}>
          <Button
            color='#BD1C5F'
            onPress={this._editProfile}
            title="Salvar"
          />
        </View>
        <View style={{ margin: 5 }}>
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
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 100,
    //backgroundColor:'transparent',
  },
  view_circle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 100 / 2,
  },
});
