import React, { Component } from 'react';
import { Picker } from 'react-native';
import styles from '../styles';
import {quantity} from '../../../__mocks__/quantity.json'
class FormPicker extends Component {
  render(){
    return (
      <Picker
      selectedValue = {this.props.value}
      onValueChange = {this.props.onValueChange}
      style = {styles.PickerStyle}
      mode = 'dropdown'
      >
      {quantity.map((i, index) => (
        <Picker.Item key = {index} label = {i.label} value = {i.value} />
      ))}
      </Picker>
    );
  }
}

export default FormPicker;
