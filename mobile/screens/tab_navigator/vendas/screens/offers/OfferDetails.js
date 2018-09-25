import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert,
} from 'react-native';
import DialogInput from 'react-native-dialog-input';

class OfferDetails extends Component {
  constructor(props) {
      super(props);
      this.state = {
        isDialogVisible:false, buyer_message: '',
      };
  }
  openDialog = async () => {
    this.setState({ isDialogVisible: true })
  }
  closeDialog = async () => {
    this.setState({ isDialogVisible: false })
  }
  submitDialog = async ({buyer_message}) => {
    const {state} = this.props.navigation;
    var product = state.params ? state.params.product : undefined;

    var create_order_path = `http://${process.env.REACT_NATIVE_PACKAGER_HOSTNAME}:5000/api/create_order`;

    fetch(create_order_path,{
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      'fk_product': product.id,
      'fk_buyer': '1',
      'buyer_message': buyer_message,
      'total_price': product.productPrice*2, //Quantidade provisória
      'quantity': '2',

      }),
  })
  .then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson);
    Alert.alert("Voce comprou o produto");
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
      return (
          <View style={styles.container}>
              <Text>{product.productName}</Text>
              <Button
                    onPress={this.openDialog}
                    title="Comprar"
              />
              <DialogInput isDialogVisible={this.state.isDialogVisible}

                title={"Envie uma mensagem ao vendedor"}
                hintInput ={"Escreva aqui"}
                submitInput={(buyer_message) => this.submitDialog({buyer_message})}
                closeDialog={this.closeDialog}>
              </DialogInput>

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
