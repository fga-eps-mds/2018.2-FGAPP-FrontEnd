/*
  Component that renders a product (food, speacially) with name, price and image.
*/

import React, { Component } from 'react';
import { Image, TouchableHighlight, View, ImageBackground } from 'react-native';
import { Card, CardItem, Text, Left, Right, Body } from 'native-base';
import styles from '../styles';
import { LinearGradient } from 'expo';

class ProductCard extends Component {
  render() {
    return (
      <Card style={{padding:10}}>
            <TouchableHighlight onPress={this.props.onPress}>
              <View style={{ flex: 1 }}>
                <ImageBackground
                  style={ styles.image }
                  source={{ uri: this.props.photo }}
                >
                  <LinearGradient
                    colors={['transparent', 'black']}
                    locations={[0.989, 0.80]}
                    style={styles.gradient}
                  />
                </ImageBackground>
                  <CardItem style={styles.item}>
                    <Left>
                      <Text style={styles.text}>{this.props.name}</Text>
                    </Left>
                    <Right>
                      <Text>
                        <Text style={styles.text}>R$ {this.props.price}</Text>
                      </Text>
                    </Right>
                  </CardItem>
              </View>
            </TouchableHighlight>
      </Card>
    );
  }
}

export default ProductCard;
