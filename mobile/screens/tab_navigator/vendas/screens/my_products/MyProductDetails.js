/*
    Screen provided for a seller update informations about your own products.
*/

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Keyboard,
    TouchableOpacity,
    Animated,
    ImageBackground,
    Image
} from 'react-native';
import ProductImage from '../../components/ProductImage';
import { Textarea, Form } from 'native-base';
import jwt_decode from 'jwt-decode';
import ErrorDialog from './ErrorDialog';
import ToogleView from './ToogleView';
import GreenButton from '../../components/GreenButton';
import RedButton from '../../components/RedButton';
import InputLab from '../../components/InputLab';

class MyProductDetails extends Component {
    constructor(props) {
      super(props);
      this.keyboardHeight = new Animated.Value(0);
      this.imageHeight = new Animated.Value(199);
      this.state = {
        isButtonsHidden: false,
        name: '',
        price: '',
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

    _goBack = async () => {
      const {state} = this.props.navigation;
      var token = state.params ? state.params.token : undefined;

      this.props.navigation.navigate('MyProducts', {token:token});
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

    editProduct = async () => {
      const {state} = this.props.navigation;
      var token = state.params ? state.params.token : undefined;
      var product = state.params ? state.params.product : undefined;

      const formData = new FormData();
      formData.append('product_id', product.id);
      formData.append('name', (this.state.name ? this.state.name : product.name));
      formData.append('price', (this.state.price ? this.state.price : product.price));
      formData.append('description', (this.state.description ? this.state.description : product.description));
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
      const edit_product_path = `${process.env.VENDAS_API}/api/edit_product/`;

      fetch(edit_product_path, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.error != undefined){
          this.setState ({ messageError: responseJson.error})
          this.setState({ isDialogVisible: true })
        }
        else{
          this.props.navigation.navigate('MyProducts', {token:token});
        }
      })
      .catch((err) => {
        this.setState ({ messageError: "Erro interno, não foi possível se comunicar com o servidor."})
        this.setState({ isDialogVisible: true })
      })
    }

    componentDidMount () {
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount () {
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
        const {state} = this.props.navigation;
        var product = state.params ? state.params.product : undefined;

        const editableIcon = require('../../assets/editableIcon.png');
        var photo = (this.state.photo == null) ? product.photo : this.state.photo;

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
                    nameLabel={product.name}
                    onChangeText={(name) => {this.setState({name})}}
                  />

                  <InputLab
                    nameLabel={product.price}
                    keyboardType='numeric'
                    onChangeText={(price) => {this.setState({price})}}
                  />

                <Textarea
                  style={{ color: 'black' }}
                  onChangeText={(description) => {this.setState({description})}}
                  rowSpan={2}
                  underline
                  placeholder={product.description}
                />
              </Form>
              <ToogleView hide={this.state.isButtonsHidden}>
                <View style={styles.buttonContainer}>
                  <RedButton
                    onPress={this._goBack}
                    text="CANCELAR"
                  />
                  <GreenButton
                    onPress={this.editProduct}
                    text="SALVAR"
                  />
                </View>
              </ToogleView>
            </Animated.View>
        );
    }
}
export default MyProductDetails;

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
