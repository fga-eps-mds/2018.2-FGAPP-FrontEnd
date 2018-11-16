import React, { Component } from 'react';
import { Image, TouchableHighlight } from 'react-native';
import { Card, CardItem, Text, Left, Right, View } from 'native-base';
import styles from './styles';

class OrderCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var status = this.props.orderStatus;
    var statusValue = (status == 0) ? 'Pendente' : (status == 1 ? 'Atendido' : 'Cancelado');

    return (
      <View style={{padding:10}}>
        <TouchableHighlight onPress={this.props.onPress}>
          <View style={styles.order_main}>
            <View style={{flexDirection: 'column', width: '65%',}}>
              <Text style={styles.order_title}>{this.props.orderName}</Text>
              <Text style={styles.order_subtitle}>{this.props.orderQuantity}</Text>
            </View>
            <View style={{flexDirection: 'column', width: '35%',}}>
              <Text style={styles.order_price}>R$ {this.props.orderPrice}</Text>
              <Text style={styles.order_status}> {statusValue} </Text>
            </View>
            <View style={{height: 10}} />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
export default OrderCard;
