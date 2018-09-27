/*
    Screen provided to present the products already ordered by a certain user.
*/

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';

import OrderCard from '../../components/OrderCard';
import jwt_decode from 'jwt-decode';

class OrderedProducts extends Component {
    constructor(props){
      super(props);
      this.state = {
        orders: [''],
        product: [''],
      };
    }

    componentDidMount(){
      fetch('http://192.168.1.4:8001/api/orders/',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ orders: responseJson });
      })
      .catch((error) => {
        console.error(error);
      });

    }
    render() {
      const {state} = this.props.navigation;
      var token = state.params ? state.params.token : undefined;
      var user = jwt_decode(token);
        return (
          <View style = {styles.container}>
            <ScrollView>
              {this.state.orders.map((order, index) => {
                if(order.fk_buyer == user.user_id){
                  return(
                    <OrderCard
                    key = {index}
                    orderName = {'Cupcake'}
                    orderQuantity = {order.quantity}
                    orderPrice = {`${order.total_price.toFixed(2)}`}
                    onPress={() => this.props.navigation.navigate('OrderDetails', {order: order, token: token})}
                   />

              );
            }
          })}
            </ScrollView>
          </View>
        );
    }
}
export default OrderedProducts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#171717',
        width: '100%',
    }
});
