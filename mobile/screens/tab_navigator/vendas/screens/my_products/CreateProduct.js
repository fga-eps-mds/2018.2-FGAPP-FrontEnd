/*
    Screen provided for a seller create a product.
*/

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Keyboard,
  Animated,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import ProductImage from '../../components/ProductImage';
import GreenButton from '../../components/GreenButton';
import RedButton from '../../components/RedButton';
import InputLab from '../../components/InputLab';
import { Textarea, Form } from 'native-base';
import jwt_decode from 'jwt-decode';
import ErrorDialog from './ErrorDialog';
import ToogleView from './ToogleView';
import { ImagePicker } from 'expo';

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.keyboardHeight = new Animated.Value(0);
    this.imageHeight = new Animated.Value(199);

    this.state = {
      isButtonsHidden: false,
      title: null,
      price: null,
      photo: null,
      description: '',
      isDialogVisible: false,
      messageError: '',
    };
  }

  openDialog = async () => {
    this.setState({ isDialogVisible: true })
  }
  closeDialog = async () => {
    this.setState({ isDialogVisible: false })
  }

  _clickPhoto = async () => {
    const {
      cancelled,
      uri,
    } = await Expo.ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: 'Images',
      quality: 0.7,
      base64: true
    });

    if (!cancelled) {
      this.setState({ photo: uri });
    }
  }

  _goBack = async () => {
    const {state} = this.props.navigation;
    var token = state.params ? state.params.token : undefined;

    this.props.navigation.navigate('MyProducts', {token:token});
  }

  registerProduct = () => {
    const { state } = this.props.navigation;
    const token = state.params ? state.params.token : undefined;
    const user = jwt_decode(token);

    const formData = new FormData();
    formData.append('fk_vendor', user.user_id);
    formData.append('name', this.state.title);
    formData.append('price', this.state.price);
    formData.append('description', this.state.description);
    formData.append('token', token);

    var uri = this.state.photo;
    if (uri != null) {
      const uriParts = uri.split('.');
      const fileType = uriParts[uriParts.length - 1];

      formData.append('photo', {
        uri: uri,
        name: `photo.${fileType}`,
        type: `application/${fileType}`,
      });
    }
    
      const createProductPath = `${process.env.VENDAS_API}/api/create_product/`;
      fetch(createProductPath, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      if (responseJson.error != null) {
        this.setState({ messageError: responseJson.error })
        this.setState({ isDialogVisible: true })
      }
      else {
        this.props.navigation.navigate('MyProducts', { token: token });
      }
    })
    .catch((err) => {
      this.setState({ messageError: "Erro interno, não foi possível se comunicar com o servidor." })
      this.setState({ isDialogVisible: true })
    })
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = (event) => {
    this.setState({ isButtonsHidden: true });
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height,
      }),
      Animated.timing(this.imageHeight, {
        duration: event.duration,
        toValue: 0,
      }),
    ]).start();
  }

  _keyboardDidHide = (event) => {
    this.setState({ isButtonsHidden: false });
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        toValue: 0,
      }),
      Animated.timing(this.imageHeight, {
        toValue: 199,
      }),
    ]).start();
  }

    render() {
      const editableIcon = require('../../assets/editableIcon.png');
      const defaultPhoto = 'https://res.cloudinary.com/integraappfga/image/upload/v1541634743/SEM_IMAGEM.jpg';
      var photo = (this.state.photo == null) ? defaultPhoto : this.state.photo;
        return (
            <Animated.View style={[styles.container, { paddingBottom: this.keyboardHeight }]}>
              <ErrorDialog
                  messageError={this.state.messageError}
                  isDialogVisible={this.state.isDialogVisible}
                  backButton = {this.closeDialog}
              />
              <TouchableOpacity onPress={this._clickPhoto}>
                <Animated.Image
                  source={{ uri: photo }}
                  style={{ height: this.imageHeight, width: '100%' }}
                />
                <Animated.Image
                  source={editableIcon}
                  style={{ position: 'absolute', left: '90%', top: '5%' }}
                />
              </TouchableOpacity>
              
              <Form style={styles.description}>

                <InputLab
                  nameLabel='Título'
                  onChangeText={(title) => this.setState({title})}
                />

                <InputLab
                  nameLabel = 'Preço'
                  keyboardType='numeric'
                  onChangeText={(price) => {this.setState({price})}}
                />

                <Textarea
                  style={{ color: 'black' }}
                  onChangeText={(description) => {this.setState({description})}}
                  rowSpan={2}
                  underline
                  placeholder="Descrição"
                />
              </Form>
              <ToogleView hide={this.state.isButtonsHidden}>
                <View style={styles.buttonContainer}>
                  <RedButton
                    onPress={this._goBack}
                    text="CANCELAR"
                  />
                  <GreenButton
                    onPress={this.registerProduct}
                    text="SALVAR"
                  />
                </View>
              </ToogleView>
            </Animated.View>
        );
    }
}
export default CreateProduct;

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
        flex: 1
    },
    description: {
      flex: 1,
      height: '35%',
      width: '95%',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingBottom: 10,
    },
});
