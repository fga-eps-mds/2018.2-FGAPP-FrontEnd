import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert,
    TextInput,
} from 'react-native';
import OfferDialog from '../../components/OfferDialog';
import jwt_decode from 'jwt-decode'

class OfferDetails extends Component {
  constructor(props) {
      super(props);
      this.state = {
        isDialogVisible:false, buyer_message: '',
        max_characters:'120',
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
    var jwtDecode = require('jwt-decode');
    var user = jwt_decode(token);
    var numero = state.params ? state.params.numero : 0;

    var create_order_path = `http://${process.env.REACT_NATIVE_PACKAGER_HOSTNAME}:5000/api/create_order`;

    fetch(create_order_path,{
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      'fk_product': product.id,
      'fk_buyer': user.user_id,
      'buyer_message': this.state.buyer_message,
      'total_price': product.productPrice*2, //Quantidade provisória
      'quantity': '2', //Quantidade Provisórua

      }),
  })
  .then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson);
    if(responseJson.error != undefined)
      Alert.alert(responseJson.error);
    else
      Alert.alert('Compra realizada com sucesso');
   })

   .catch( err => {
     if (typeof err.text === 'function') {
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
      var characters = `${this.state.buyer_message.length.toString()}/${this.state.max_characters}`;


      return (
          <View style={styles.container}>
              <Text>{product.productName}</Text>
              <Button
                    onPress={this.openDialog}
                    title="Comprar"
              />
              <OfferDialog
                isDialogVisible={this.state.isDialogVisible}
                backButton = {this.closeDialog}
                sendButton = {this.submitDialog}
                onChangeText = {(buyer_message) => this.setState({buyer_message})}
                characters = {characters}
              />
          </View>
      );
    }
}
export default OfferDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
