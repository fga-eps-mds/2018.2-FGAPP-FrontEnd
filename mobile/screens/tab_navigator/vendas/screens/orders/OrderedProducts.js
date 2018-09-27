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
import OrderCard from '../../components/OrderCard'
import jwt_decode from 'jwt-decode'

class OrderedProducts extends Component {
    constructor(props) {
      super(props);
      this.state = {
          orders: [''],
      };
    }
    componentDidMount() {
      const {state} = this.props.navigation;
      var token = state.params ? state.params.token : undefined;
      var user = jwt_decode(token);

      //Referencia para API gateway
      const orders_screen_path = `http://${process.env.REACT_NATIVE_PACKAGER_HOSTNAME}:5000/api/orders_screen`;

      fetch(orders_screen_path, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          'user_id': user.user_id, //UsernameField foi definido como email
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson);
          this.setState({ orders: responseJson });
      })
      .catch((error) => {
          console.error(error);
      });
    }
    render() {
      const {state} = this.props.navigation;
      var token = state.params ? state.params.token : undefined;
        return (
          <View style={styles.container}>
              <ScrollView>
                {this.state.orders.map((order, index) => {
                    return (
                      <OrderCard
                        key={index}
                        orderName = {`Produto: ${order.fk_product}`}
                        orderQuantity = {`Quantidade: ${order.quantity}`}
                        orderPrice = {order.total_price}
                        onPress={() => this.props.navigation.navigate('OrderDetails', {order: order, token:token})}
                      />
                    );
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