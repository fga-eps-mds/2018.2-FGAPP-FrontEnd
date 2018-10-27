import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    CardItem,
    Button,
    Alert,
    ImageBackground,
} from 'react-native';
import styles from '../../components/styles'
import jwt_decode from 'jwt-decode'
import { LinearGradient } from 'expo';

class OrderDetails extends Component {

    _onPressButton = async () => {
      Alert.alert("O botao foi apertado. ");
    }

    loadUser(token, order){
      const get_product_path = `${process.env.VENDAS_API}/api/get_name/`;

      var name = 'Usuário sem nome';
  		fetch(get_product_path, {
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
      var user = jwt_decode(token);
      var photo = this.loadProduct(token, order);
      var name = this.loadUser(token, order);

        return (
          <ScrollView>
            <View style={styles.details_main}>
              <Image
                style={styles.image }
                source={{ uri: photo}}
              >
              </Image>
              <View style={{ flexDirection: 'row', paddingBottom: 2, paddingLeft: 10}}>
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
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '70%'}}/>
                <Button
                  color="#0EAC6F"
                  title="Atendido"
                  onPress={this._onPressButton}
                />
              </View>
            <View style={{padding:20}}/>
            </View>
          </ScrollView>
        );
    }
}
export default OrderDetails;

const styless = StyleSheet.create({
    container: {
        flex: 1,
        //width: '100%',
    }
});
