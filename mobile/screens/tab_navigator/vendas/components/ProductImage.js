/*
  Component that renders a product (food, speacially) with name, price and image.
*/

import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Card, CardItem, Text, Left, Right } from 'native-base';
import styles from './styles';
import { LinearGradient } from 'expo';

class ProductImage extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image
          style={ styles.image }
          source={{ uri: this.props.photo }}
        >
        </Image>
      </View>
    );
  }
}

export default ProductImage;
