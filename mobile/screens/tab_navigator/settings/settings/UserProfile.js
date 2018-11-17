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
import UserCard from '../../../components/UserCard'

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      email: undefined,
      photo: undefined,
      need_logout: false,
    };
  }

  _goBack = async () => {
    const { state } = this.props.navigation;
    var token = state.params ? state.params.token : undefined;

    Alert.alert('Informações atualizadas com sucesso.');
    this.props.navigation.navigate('Settings', { token: token });
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
  _logout = async () => {
    const logoutPath = `${process.env.INTEGRA_LOGIN_AUTH}/api/logout/`;
    fetch(logoutPath, {
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
        this.props.navigation.state.params.token = null;
        this.props.navigation.navigate('LoginScreen');
      }
    })
    .catch(err => {
      if (typeof err.text === 'function') {
        err.text().then(errorMessage => {
          this.props.dispatch(displayTheError(errorMessage));
        });
      } else {
        Alert.alert('Erro na conexão.');
        console.log(err);
      }
    });
  }

  _editProfile = async () => {
    const { state } = this.props.navigation;
    var token = state.params ? state.params.token : undefined;

    var user = jwt_decode(token);
    var name = this.state.name;
    var email = this.state.email;
    const uri = this.state.photo;

    const formData = new FormData();
    const updateProfilePath = `${process.env.INTEGRA_LOGIN_AUTH}/api/users/update_profile/`;
    formData.append('user_id', user.user_id);
    if ((name != undefined))
      formData.append('name', name);

    if ((email != undefined)){
      formData.append('email', email);
      this.setState({ need_logout: true });
    }  
    if (uri != undefined) {
      const uriParts = uri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      formData.append('photo', {
        uri: uri,
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

    fetch(updateProfilePath, options)
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      if (responseJson.error != undefined) {
        Alert.alert(responseJson.error);
      }
      else {
        if(this.state.need_logout){
          Alert.alert('Entre no app novamente para aplicar mudanças');
          this._logout();
        }
        else{
          this._goBack();
        }
      }
    })
    .catch(err => {
      if (typeof err.text === 'function') {
        err.text().then(errorMessage => {
          this.props.dispatch(displayTheError(errorMessage));
        });
      } else {
        Alert.alert("Erro na conexão.");
        console.log(err);
      }
    });
  }

  render() {
    const { state } = this.props.navigation;
    const userInfo = state.params ? state.params.userInfo : undefined;
    var name = (this.state.name == undefined) ? userInfo.name : this.state.name;
    var email = (this.state.email == undefined) ? userInfo.email : this.state.email;
    var photo = (this.state.photo == undefined) ? userInfo.photo : this.state.photo;

    return (
      <View style={styles.container}>
        <View style={{ margin: 5 }}>
          <UserCard
            onPress={this._clickPhoto}
            imageSource={{uri: photo}}
            namePlaceholder={name}
            onChangeTextName={(name) => this.setState({name})}
            emailPlaceholder={email}
            onChangeTextEmail={(email) => this.setState({email})}
          />
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
