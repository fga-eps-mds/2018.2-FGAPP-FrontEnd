import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    CardItem,
    Alert,
    ImageBackground,
} from 'react-native';
import styles from '../../styles'
import { LinearGradient } from 'expo';
import { Button } from 'native-base';


class OrderDetails extends Component {

    constructor(props) {
      super(props);
      this.state = {
        request: '0',
      };
    }
    _cancelButton = async () => {
      const {state} = this.props.navigation;
      var order = state.params ? state.params.order : undefined;
      var token = state.params ? state.params.token : undefined;
      const set_order_status_path = `${process.env.VENDAS_API}/api/set_order_status/`;

      fetch(set_order_status_path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'order_id': order.id,
          'new_status': '2',
          'token': token,
        }),
      })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if(responseJson.error != undefined)
          Alert.alert(responseJson.error)

        else
          Alert.alert('Operação realizada com sucesso.')
          this.props.navigation.navigate('OrderedProducts', {token:token})
      })
      .catch((err) => {
        console.error(err)
      })
    }

    _closeButton = async () => {
      const {state} = this.props.navigation;
      var order = state.params ? state.params.order : undefined;
      var token = state.params ? state.params.token : undefined;
      const set_order_status_path = `${process.env.VENDAS_API}/api/set_order_status/`;

      fetch(set_order_status_path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'order_id': order.id,
          'new_status': '1',
          'token': token,
        }),
      })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if(responseJson.error != undefined)
          Alert.alert(responseJson.error)

        else
          Alert.alert('Operação realizada com sucesso.')
          this.props.navigation.navigate('OrderedProducts', {token:token})
      })
      .catch((err) => {
        console.error(err)
      })
    }

    _buttonRequest() {
      const {state} = this.props.navigation;
      var order = state.params ? state.params.order : undefined;
      var token = state.params ? state.params.token : undefined;
      const set_order_status_path = `${process.env.VENDAS_API}/api/set_order_status/`;

      fetch(set_order_status_path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'order_id': order.id,
          'new_status': this.state.request,
          'token': token,
        }),
      })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if(responseJson.error != undefined)
          Alert.alert(responseJson.error)

        else
          Alert.alert('Operação realizada com sucesso.')
          this.props.navigation.navigate('OrderedProducts', {token:token})
      })
      .catch((err) => {
        console.error(err)
      })
    }

    _goBack= async () => {
      const {state} = this.props.navigation;
      var token = state.params ? state.params.token : undefined;

      this.props.navigation.navigate('OrderedProducts', {token:token});
    }

    loadUser(token, order){
      const get_user_path = `${process.env.VENDAS_API}/api/get_name/`;

      var name = 'Usuário sem nome';
  		fetch(get_user_path, {
  			method: 'POST',
  			headers: {
  			'Content-Type': 'application/json',
  			},
  			body: JSON.stringify({
  				'token': token,
        	'user_id': order.fk_buyer,
  			}),
  		})
  			.then((response) => { return response.json() })
  			.then((responseJson) => {
          if(responseJson.photo != '')
            name=responseJson.name;
  			})
  			.catch((error) => {
  				console.error(error);
        });

      return name;
    }

    loadProduct(token, order){
      const get_product_path = `${process.env.VENDAS_API}/api/get_product/`;

      var photo = 'http://www.piniswiss.com/wp-content/uploads/2013/05/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef-300x199.png';
  		fetch(get_product_path, {
  			method: 'POST',
  			headers: {
  				'Content-Type': 'application/json',
  			},
  			body: JSON.stringify({
  				'token': token,
          'product_id': order.fk_product,
  			}),
  		})
  			.then((response) => { return response.json() })
  			.then((responseJson) => {
          console.log(responseJson.photo);
          if(responseJson.photo != '')
            photo=responseJson.photo;
  			})
  			.catch((error) => {
  				console.error(error);
        });

      return photo;
    }

    render() {
      const {state} = this.props.navigation;
      var token = state.params ? state.params.token : undefined;
      var order = state.params ? state.params.order : undefined;
      var photo = this.loadProduct(token, order);
      var name = this.loadUser(token, order);

        return (
          <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={styles.details_main}>
              <Image
                style={styles.image }
                source={{ uri: photo}}
              >
              </Image>
              <View style={{ flexDirection: 'row', paddingLeft: 10}}>
                <View style={{flexDirection: 'column', width: '70%',}}>
                  <Text style={{fontSize: 25}}>{order.product_name}</Text>
                  <Text style={{fontSize: 20}}>R$ {parseFloat(order.total_price).toFixed(2)}</Text>
                </View>
                <View style={{flexDirection: 'column', width: '30%'}}>
                  <Text style={{fontSize: 12}}>Quantidade</Text>
                  <Text style={{fontSize: 16}}>{order.quantity}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
                <Text style={{fontSize: 20}}>Cliente: {name}</Text>
                <View style={{height: 10}}/>
                <Text style={{fontSize: 16, color: '#5A5A5A'}}>{order.buyer_message}</Text>
                <View style={{height: 50}}/>
              </View>
              <View style={local_styles.buttonContainer}>
                <Button
                  onPress={this._cancelButton}
                  style={local_styles.button}
                  danger
                >
                  <Text style={{color: 'white'}}> CANCELAR </Text>
                  <Text style={{color: 'white'}}> PEDIDO </Text>
                </Button>
                <Button
                  onPress={this._closeButton}
                  style={local_styles.button}
                  success
                >
                  <Text style={{color: 'white'}}>ATENDIDO</Text>
                </Button>
              </View>
            </View>
          </ScrollView>
        );
    }
}
export default OrderDetails;

const local_styles = StyleSheet.create({
    container: {
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
      flexDirection: 'column',
      height: 40,
      width: 100,
    }
});
