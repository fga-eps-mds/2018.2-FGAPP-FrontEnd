import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Picker,
    Alert,
} from 'react-native';
import ProductImage from '../../components/ProductImage';
import styles from '../../components/styles';
import { Card, CardItem, Text, Left, Right, Content, Body} from 'native-base';
import OfferDialog from '../../components/OfferDialog';
import jwt_decode from 'jwt-decode';

const Quantity = [
  {
    label: '1',
    value: '1'
  },
  {
    label: '2',
    value: '2'
  },
  {
    label: '3',
    value: '3'
  },
  {
    label: '4',
    value: '4'
  },
  {
    label: '5',
    value: '5'
  },
  {
    label: '6',
    value: '6'
  }
];

class FormPicker extends Component {
  constructor(props){
    super(props);
    this.state = {
        modalVisible: false
    };
  }

  render(){
    return (
      <Picker
      selectedValue = {this.props.value}
      onValueChange = {this.props.onValueChange}
      style = {styles.PickerStyle}
      >
      {this.props.items.map((i, index) => (
        <Picker.Item key = {index} label = {i.label} value = {i.value} />
      ))}
      </Picker>
    );
  }
}


 class OfferDetails extends Component {
    constructor(props){
      super(props);
      this.state = {
        quantity: '1',
        isDialogVisible: false,
        buyer_message: '',
        max_characters: '120',
      };
    }

    openDialog = async () => {
      this.setState({ buyer_message: '' })
      this.setState({ isDialogVisible: true })
    }

    closeDialog = async () => {
      this.setState({ isDialogVisible: false })
      this.setState({ buyer_message: '' })
    }

    submitDialog = async () => {
      const {state} = this.props.navigation;
      var product = state.params ? state.params.product : undefined;
      var token = state.params ? state.params.token : undefined;
      var user = jwt_decode(token);

    const create_order_path = `http://${process.env.REACT_NATIVE_PACKAGER_HOSTNAME}:5000/api/create_order`;

      fetch(create_order_path, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'fk_product': product.id,
          'fk_buyer': user.user_id,
          'buyer_message': this.state.buyer_message,
          'total_price': product.productPrice * this.state.quantity,
          'quantity': this.state.quantity,
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if(responseJson.error != undefined){
          Alert.alert(responseJson.error);
        }
        else{
          Alert.alert('Compra realizada com sucesso');
        }
      })

      .catch(err => {
        if(typeof err.text  === 'function'){
          err.text().then(errorMessage => {
            this.props.dispatch(displayTheError(errorMessage))
          });
        } else {
          Alert.alert("Erro na conexão com o servidor.");
          console.log(err)
        }
      });
      this.setState({ isDialogVisible: false });
    }

    render() {
      const {state} = this.props.navigation;
      var product = state.params ? state.params.product : undefined;

      const characters = `${this.state.buyer_message.length.toString()}/${this.state.max_characters}`;

      var price = `${this.state.quantity}` * `${product.price}`;

      return (
          <View style={styless.container}>
            <Content>
              <ProductImage
                photo={product.photo}
                />
              <CardItem style={styles.info}>
                <Text style={styles.textVendor}> Fulano da Silva </Text>
              </CardItem>

              <CardItem style={styles.info}>
                <Text style={styles.textInfo}> {product.name} </Text>
               </CardItem>

               <CardItem style={styles.info}>
                <Text style={styles.textInfo}> R$ {price} </Text>
              </CardItem>

              <CardItem style={styles.description}>
                <Body>
                  <Text style={styles.textDescription}> {product.description} </Text>
                </Body>
              </CardItem>
              <CardItem style = {styles.buttonCard}>
              <TouchableOpacity style={styles.customBtnBG}
              onPress={this.openDialog}>
                <Text style={styles.customBtnText}> Pedir </Text>
              </TouchableOpacity>

              <OfferDialog
                isDialogVisible = {this.state.isDialogVisible}
                backButton = {this.closeDialog}
                sendButton = {this.submitDialog}
                onChangeText = {(buyer_message) => this.setState({buyer_message})}
                characters = {characters}
              />
              </CardItem>
              <Text style = {styles.PickerText}> Quantidade </Text>

              <FormPicker
                items={Quantity}
                value={this.state.quantity}
                onValueChange={(itemValue, itemIndex) => this.setState({ quantity: itemValue })}
              />
            </Content>

          </View>
      );
    }
}
export default OfferDetails;

const styless = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#171717',
        //width: '100%',
    }
});
