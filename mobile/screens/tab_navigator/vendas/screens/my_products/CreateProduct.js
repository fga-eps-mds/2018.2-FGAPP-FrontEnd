/*
    Screen provided for a seller create a product.
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
import GreenButton from '../../components/GreenButton';
import RedButton from '../../components/RedButton';
import InputLab from '../../components/InputLab';
import { Textarea, Form } from 'native-base';
import jwt_decode from 'jwt-decode';
import ErrorDialog from './ErrorDialog';
import ToogleView from './ToogleView';

const DEFAULT_IMAGE = 'http://www.piniswiss.com/wp-content/uploads/2013/05/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef-300x199.png';

class CreateProduct extends Component {
    constructor(props) {
      super(props);
      this.keyboardHeight = new Animated.Value(0);
      this.imageHeight = new Animated.Value(199);
      this.state = {
        isButtonsHidden: false,
        title: '',
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

    registerProduct = async () => {
      const {state} = this.props.navigation;
      var token = state.params ? state.params.token : undefined;
      var jwtDecode = require('jwt-decode');
      var user = jwt_decode(token);
      const create_product_path = `${process.env.VENDAS_API}/api/create_product/`;
      fetch(create_product_path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'fk_vendor': user.user_id,
          'name': this.state.title,
          'price': this.state.price,
          'photo': 'https://foodrevolution.org/wp-content/uploads/2018/04/blog-featured-diabetes-20180406-1330.jpg',
          'description': this.state.description,
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
        return (
            <Animated.View style={[styles.container, { paddingBottom: this.keyboardHeight }]}>
              <ErrorDialog
                  messageError={this.state.messageError}
                  isDialogVisible={this.state.isDialogVisible}
                  backButton = {this.closeDialog}
              />
              <Animated.Image source={{ uri: DEFAULT_IMAGE }} style={[styles.logo, { height: this.imageHeight, width: '100%' }]} />
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
