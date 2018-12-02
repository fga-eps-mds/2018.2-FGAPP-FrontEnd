/*
  Component that renders a product (food, speacially) with name, price and image.
*/

import React, { Component } from 'react';
import { Image, ImageBackground, View } from 'react-native';
import { Card, CardItem, Text, Left, Right } from 'native-base';
import styles from '../styles';
import { LinearGradient } from 'expo';

class ProductImage extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={ styles.image }
          source={{ uri: this.props.photo }}
        >
          <LinearGradient
            colors={['transparent', 'black']}
            locations={[0.989, 0.90]}
            style={styles.gradient}
          />
        </ImageBackground>
      </View>
    );
  }
}

export default ProductImage;
