import React, { Component } from 'react';
import {
  Text,
  AppRegistry,
  TextInput,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';

export default class Field extends Component{
  constructor(props) {
    super(props);
    this.state = {
      placeholder: '',
      badInput: false,
      fieldAlert: [''],
      keyExtractor: null,
      onChangeText: '',
      secureTextEntry:false,
    };
  }

  render(){

    if (this.props.badInput){
      field_style = {
        //backgroundColor: '#F78181',
        color: 'red',
      }
    }
    else{ // default button style
      field_style = {
        color: 'white',
        //borderWidth: 2,
      }
    }
  return(
    <View style={this.props.style}>
    <Form>
      <Item floatingLabel>
        <Label style={field_style}>{this.props.placeholder}</Label>
        <Input
          style={{color: 'white'}}
          secureTextEntry={this.props.secureTextEntry}
          onChangeText={this.props.onChangeText}
          underlineColorAndroid={'white'}
        />
      </Item>
    </Form>
     <FlatList
      data={this.props.fieldAlert}
      renderItem={({item}) => <Text style ={{color: 'red'}}>{item}</Text>}
      keyExtractor={item => this.props.keyExtractor}

      />
     </View>
  )
  }
}
