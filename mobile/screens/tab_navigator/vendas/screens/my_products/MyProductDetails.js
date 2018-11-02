/*
    Screen provided for a seller update informations about your own products.
*/

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Keyboard,
    Animated
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
    editProduct = async () => {
      const {state} = this.props.navigation;
      var token = state.params ? state.params.token : undefined;
      var product = state.params ? state.params.product : undefined;

      var name = this.state.name ? this.state.name : product.name;
      var price = this.state.price ? this.state.price : product.price;
      var description = this.state.description ? this.state.name : product.description;

      const edit_product_path = `${process.env.VENDAS_API}/api/edit_product/`;
      fetch(edit_product_path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'product_id': product.id,
            'price': price,
            'name': name,
            'description': description,
            'photo': product.photo, // <- Need atention later
            'token':token,
        }),
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
        return (
            <Animated.View style={[styles.container, { paddingBottom: this.keyboardHeight }]}>
              <ErrorDialog
                  messageError={this.state.messageError}
                  isDialogVisible={this.state.isDialogVisible}
                  backButton = {this.closeDialog}
              />
              <Animated.Image source={{ uri: 'http://www.piniswiss.com/wp-content/uploads/2013/05/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef-300x199.png' }} style={[styles.logo, { height: this.imageHeight, width: '100%' }]} />
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
