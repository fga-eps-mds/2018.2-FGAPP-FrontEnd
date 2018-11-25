/*
    Screen provided to present the products already ordered by a certain user.
*/

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl
} from 'react-native';
import OrderCard from '../../components/OrderCard'
import BuyerOrderCard from '../../components/BuyerOrderCard'
import OrderHeader from '../../components/OrderHeader'
import jwt_decode from 'jwt-decode'
import {getUserToken} from '../../../../../AuthMethods'

class OrderedProducts extends Component {
    constructor(props) {
      super(props);
      this.state = {
          token: undefined,
          orders: [''],
          buyer_orders: [''],
          refreshing: false,
          my_order_message: 'Meus pedidos',
          received_order_message: 'Pedidos recebidos',
      };
    }
    componentDidMount(){
        getUserToken()
        .then(res =>{ 
            this.setState({ token: res })
            this.loadOrders();
        })
    }

    loadOrders = async () => {
      var user = jwt_decode(this.state.token);

      //Reference to API gateway
      const orders_screen_path = `${process.env.VENDAS_API}/api/orders_screen/`;

      fetch(orders_screen_path, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          'user_id': user.user_id, //UsernameField foi definido como email
          'token': this.state.token,
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson);
          if (responseJson.length == 0) {
            this.setState({ received_order_message: 'Você não recebeu pedidos' });
          }
          else {
            this.setState({ received_order_message: 'Pedidos recebidos' });
          }
          if (responseJson.length > 1) {
            responseJson.sort((order1, order2) => {
              return (order1.date - order2.date);
            }).reverse();
          }
          this.setState({ orders: responseJson });
      })
      .catch((error) => {
          console.error(error);
      });

      const buyer_orders_path = `${process.env.VENDAS_API}/api/buyer_orders/`;

      fetch(buyer_orders_path, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          'user_id': user.user_id,
          'token': this.state.token, // TODO test token
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson);
          if (responseJson.length == 0) {
            this.setState({ my_order_message: 'Você não fez pedidos' });
          }
          else {
            this.setState({ my_order_message: 'Meus pedidos' });
          }
          if (responseJson.length > 1) {
            responseJson.sort((order1, order2) => {
              return (order1.date - order2.date);
            }).reverse();
          }
          this.setState({ buyer_orders: responseJson });
      })
    }

    refreshOrders = async () => {
        this.setState({refreshing: true});
        this.loadOrders().then(() => {
            this.setState({refreshing: false});
        });
    }


    render() {      
        return (
          <View style={styles.container}>
                <ScrollView
                    refreshControl = {
                        <RefreshControl
                            refreshing = {this.state.refreshing}
                            onRefresh = {this.refreshOrders}
                        />
                    }
                >
                <OrderHeader
                  message = {this.state.my_order_message}
                />
                {this.state.buyer_orders.map((buyer_order, index) => {
                    return (
                      <BuyerOrderCard
                        style={{paddingBottom:20}}
                        key={index}
                        orderName = {`${buyer_order.product_name}`}
                        orderQuantity = {`Quantidade: ${buyer_order.quantity}`}
                        orderPrice = {parseFloat(buyer_order.total_price).toFixed(2)}
                        orderStatus = {`${buyer_order.status}`}
                        onPress={() => this.props.navigation.navigate('OrderDetails', { order: buyer_order, token:this.state.token })}
                      />
                    );
                })}
                <OrderHeader
                  message = {this.state.received_order_message}
                />
                {this.state.orders.map((order, index) => {
                    return (
                      <OrderCard
                        style={{paddingBottom:20}}
                        key={index}
                        orderName = {`${order.product_name}`}
                        orderQuantity = {`Quantidade: ${order.quantity}`}
                        orderStatus = {`${order.status}`}
                        orderPrice = {parseFloat(order.total_price).toFixed(2)}
                        orderStatus = {`${order.status}`}
                        onPress={() => this.props.navigation.navigate('OrderDetails', { order: order, token:this.state.token })}
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
        width: '100%',
    }
});
