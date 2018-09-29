/*
    Screen provided to present the products already ordered by a certain user.
*/

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import ProductImage from '../../components/ProductImage';
import { Container, Header, Textarea, Content, Alert, Form, Item, Input, Label, Button } from 'native-base';
import jwt_decode from 'jwt-decode';
import ErrorDialog from './ErrorDialog';

class CreateProduct extends Component {
    constructor(props) {
      super(props);
      this.state = {
        title: '',
        price: '',
        description: '',
        isDialogVisible:false,
        messageError: '',
      };
    }

    openDialog = async () => {
      this.setState({ isDialogVisible: true })
    }
    closeDialog = async () => {
      this.setState({ isDialogVisible: false })
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
          'photo': 'https://cdn.cnn.com/cnnnext/dam/assets/171027052520-processed-foods-exlarge-tease.jpg',
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


    render() {
        const {state} = this.props.navigation;
        var token = state.params ? state.params.token : undefined;
        var jwtDecode = require('jwt-decode');
        var user = jwt_decode(token);
        return (
            <View style={styles.container}>
              <ErrorDialog
                  messageError={this.state.messageError}
                  isDialogVisible={this.state.isDialogVisible}
                  backButton = {this.closeDialog}
              />
              <ProductImage style= { styles.image } photo='http://www.piniswiss.com/wp-content/uploads/2013/05/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef-300x199.png'>
              </ProductImage>
              <Form style={styles.description}>
                <Item floatingLabel>
                  <Label>Título</Label>
                  <Input style={{ color: "white" }} onChangeText={(title) => {this.setState({title})}} />
                </Item>
                <Item floatingLabel>
                  <Label>Preço</Label>
                  <Input style={{ color: "white" }} onChangeText={(price) => {this.setState({price})}} />
                </Item>
                <Textarea style={{ color: "white" }} onChangeText={(description) => {this.setState({description})}} rowSpan={2} underline placeholder="Descrição" />
              </Form>
              <View style={styles.buttonContainer}>
                <Button onPress={() => {this.props.navigation.navigate('MyProducts', {token:token});}} style={{justifyContent: 'center', height: 40, width: 100}} danger><Text style={{color: 'white'}}> CANCELAR </Text></Button>
                <Button onPress={this.registerProduct} style={{justifyContent: 'center', height: 40, width: 100}} success><Text style={{color: 'white'}}> SALVAR </Text></Button>
              </View>

            </View>
        );
    }
}
export default CreateProduct;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#171717',
        flex: 1
    },
    image: {
      width: '100%',
      height: '30%',
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
