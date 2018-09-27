import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import ProductImage from '../../components/ProductImage';
import styles from '../../components/styles';
import { Card, CardItem, Text, Left, Right, Content, Body} from 'native-base';


 class OfferDetails extends Component {
    render() {
      const {state} = this.props.navigation;
      var product = state.params ? state.params.product : undefined;
      const handlePress = () => false
      return (
          <View style={styless.container}>
            <Content>
              <ProductImage
                productImage={product.photo}
                />
              <CardItem style={styles.info}>
                <Text style={styles.textVendor}> Fulano da Silva </Text>
              </CardItem>
              <CardItem style={styles.info}>
                <Text style={styles.textInfo}> {product.name} </Text>
               </CardItem>
               <CardItem style={styles.info}>
                <Text style={styles.textInfo}> R$ {product.price} </Text>
              </CardItem>
              <CardItem style={styles.description}>
                <Body>
                  <Text style={styles.textDescription}> {product.description} </Text>
                </Body>
              </CardItem>
            </Content>
            <TouchableOpacity style={styles.customBtnBG}
            onPress={handlePress}>
              <Text style={styles.customBtnText}> Pedir </Text>
            </TouchableOpacity>
          </View>
      );
    }
}
export default OfferDetails;

const styless = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#171717',
        //width: '100%',
    }
});
