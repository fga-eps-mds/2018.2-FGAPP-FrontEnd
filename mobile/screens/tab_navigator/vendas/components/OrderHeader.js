import React, { Component } from 'react';
import { Image, TouchableHighlight } from 'react-native';
import { Card, CardItem, Text, Left, Right, View } from 'native-base';
import styles from './styles';

class OrderHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var message = this.props.message;

    return (
      <View style={{padding:10}}>
        <View style={styles.order_header}>
          <View style={{flexDirection: 'column', width: '100%',}}>
            <Text style={styles.order_header_title}>{message}</Text>
          </View>
          <View style={{height: 10}} />
        </View>
      </View>
    );
  }
}
export default OrderHeader;
