import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView
} from "react-native";
import {
  Container,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Textarea
} from 'native-base'

export default class RegisterLocal extends Component{
  render() {
    return (
      <Container style={styles.container}>
        <Input rounded placeholder='Nome do local' />
        <Item picker>
          <Picker
            mode='dropdown'
            iosIcon={<Icon name='ios-arrow-down-outline' />}
            style=({ width: undefined })
            placeholder='Categoria do local'
          >
            <Picker.Item label='Restaurante' value='0'/>
            <Picker.Item label='Papelaria' value='1'/>
            <Picker.Item label='Bar' value='2'/>
            <Picker.Item label='Banco' value='3'/>
            <Picker.Item label='Lanchonete' value='4'/>
            <Picker.Item label='Hookah' value='5'/>
          </Picker>
        </Item>
        <Textarea rowSpan={5} rounded placeholder='Descrição do local'/>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: "white",
    padding: 20,
    top:0,
    bottom:0,
    left:0,
    right:0
  }
});
