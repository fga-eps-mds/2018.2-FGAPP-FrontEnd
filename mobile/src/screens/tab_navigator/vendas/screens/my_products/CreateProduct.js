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
import { Textarea, Form, Item, Input, Label, Button } from 'native-base';
import jwt_decode from 'jwt-decode';
import ErrorDialog from './ErrorDialog';
import ToogleView from './ToogleView';
import {getUserToken} from '../../../../../AuthMethods'

class CreateProduct extends Component {
    constructor(props) {
      super(props);
      this.keyboardHeight = new Animated.Value(0);
      this.imageHeight = new Animated.Value(199);
      this.state = {
        token:undefined,
        isButtonsHidden: false,
        title: '',
        price: '',
        description: '',
        isDialogVisible: false,
        messageError: '',
      };
    }
    componentWillMount(){
      getUserToken()
      .then(res => this.setState({ token: res }))
      .catch(err => alert("Erro"));
    }

    openDialog = async () => {
      this.setState({ isDialogVisible: true })
    }
    closeDialog = async () => {
      this.setState({ isDialogVisible: false })
    }

    registerProduct = async () => {
      var user = jwt_decode(this.state.token);
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
          'token':this.state.token,
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
          this.props.navigation.navigate('MyProducts');
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
              <Animated.Image source={{ uri: 'http://www.piniswiss.com/wp-content/uploads/2013/05/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef-300x199.png' }} style={[styles.logo, { height: this.imageHeight, width: '100%' }]} />
              <Form style={styles.description}>
                <Item floatingLabel>
                  <Label>Título</Label>
                  <Input
                    style={{ color: 'black' }}
                    onChangeText={(title) => {this.setState({title})}}
                  />
                </Item>
                <Item floatingLabel>
                  <Label>Preço</Label>
                  <Input
                    style={{ color: 'black' }}
                    keyboardType='numeric'
                    onChangeText={(price) => {this.setState({price})}}
                  />
                </Item>
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
                  <Button
                    onPress={() => {this.props.navigation.navigate('MyProducts');}}
                    style={styles.button}
                    danger
                  >
                    <Text style={{color: 'white'}}> CANCELAR </Text>
                  </Button>
                  <Button
                    onPress={this.registerProduct}
                    style={styles.button}
                    success
                  >
                    <Text style={{color: 'white'}}> SALVAR </Text>
                  </Button>
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
    button: {
      justifyContent: 'center',
      height: 40,
      width: 100,
    }
});
