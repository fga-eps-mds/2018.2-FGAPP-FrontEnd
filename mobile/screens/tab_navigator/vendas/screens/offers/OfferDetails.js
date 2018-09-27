import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Picker,
    AppRegistry
} from 'react-native';
import ProductImage from '../../components/ProductImage';
import styles from '../../components/styles';
import { Card, CardItem, Text, Left, Right, Content, Body} from 'native-base';

const Quantity = [
  {
    label: '1',
    value: '1'
  },
  {
    label: '2',
    value: '2'
  },
  {
    label: '3',
    value: '3'
  },
  {
    label: '4',
    value: '4'
  },
  {
    label: '5',
    value: '5'
  },
  {
    label: '6',
    value: '6'
  }
];

class FormPicker extends Component {
  constructor(props){
    super(props);
    this.state = {
        modalVisible: false
    };
  }

  render(){
    return (
      <Picker
      selectedValue = {this.props.value}
      onValueChange = {this.props.onValueChange}
      style = {styles.PickerStyle}
      >
      {this.props.items.map((i, index) => (
        <Picker.Item key = {index} label = {i.label} value = {i.value} />
      ))}
      </Picker>
    );
  }
}


 class OfferDetails extends Component {
    constructor(props){
      super(props);
      this.states = {
        quantity: '',
      };
    }

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

            <Text style = {styles.PickerText}> Quantidade </Text>

            <FormPicker
              items={Quantity}
              value={this.states.quantity}
              onValueChange={(itemValue, itemIndex) => this.setState({ quantity: itemValue })}
            />

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

AppRegistry.registerComponent('FormPicker', () => OfferDetail);
