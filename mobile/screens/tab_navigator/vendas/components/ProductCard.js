/*
  Component that renders a product (food, speacially) with name, price and image.
*/

import React, { Component } from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Text, Left, Right } from 'native-base';
import styles from './styles';

class ProductCard extends Component {
  render() {
    return (
      <Card style={styles.main}>
        <CardItem cardBody>
          <Image
            style={styles.imageItems}
            source={{ uri: this.props.productImage }}
          />
        </CardItem>

        <CardItem style={styles.items}>
          <Left>
            <Text style={styles.text}>{this.props.productName}</Text>
          </Left>
          <Right>
            <Text>
              <Text style={styles.text}>R$ {this.props.productPrice}</Text>
            </Text>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

export default ProductCard;
