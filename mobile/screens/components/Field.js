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
        paddingLeft: 20,
        height: 50,
        backgroundColor: '#F78181',
        borderColor: 'red',
        color: 'white',
        //borderWidth: 2,
      }
    }
    else{ // default button style
      field_style = {
        paddingLeft: 20,
        height: 50,
        color: 'white',
        //borderWidth: 2,
      }
    }
  return(
    <View style={this.props.style}>
    <TextInput
      style={field_style}
      placeholder={this.props.placeholder}
      secureTextEntry={this.props.secureTextEntry}
      onChangeText={this.props.onChangeText}
      underlineColorAndroid={'white'}

     />
     <FlatList
      data={this.props.fieldAlert}
      renderItem={({item}) => <Text style ={{color: 'red'}}>{item}</Text>}
      keyExtractor={item => this.props.keyExtractor}

      />
     </View>
  )
  }
}
