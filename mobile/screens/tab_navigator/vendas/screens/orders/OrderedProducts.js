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
import jwt_decode from 'jwt-decode'

class OrderedProducts extends Component {
    constructor(props) {
      super(props);
      this.state = {
          orders: [''],
          refreshing: false,
      };
    }
    componentDidMount(){
        this.loadOrders();
    }
    loadOrders = async () => {
      const {state} = this.props.navigation;
      var token = state.params ? state.params.token : undefined;
      var user = jwt_decode(token);

      //Referencia para API gateway
      const orders_screen_path = `${process.env.VENDAS_API}/api/orders_screen/`;

      fetch(orders_screen_path, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          'user_id': user.user_id, //UsernameField foi definido como email
          'token': token,
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

    refreshOrders = async () => {
        this.setState({refreshing: true});
        this.loadOrders().then(() => {
            this.setState({refreshing: false});
        });
    }


    render() {
      const {state} = this.props.navigation;
      var token = state.params ? state.params.token : undefined;
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
                {this.state.orders.map((order, index) => {
                    return (
                      <OrderCard
                        key={index}
                        orderName = {`${order.product_name}`}
                        orderQuantity = {`Quantidade: ${order.quantity}`}
                        orderPrice = {parseFloat(order.total_price).toFixed(2)}
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
