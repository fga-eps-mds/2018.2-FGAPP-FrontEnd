import styles from '../styles';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';


class RedButton extends React.Component{
  render(){
    return(
      <TouchableOpacity style={styles.customBtnBR}
        onPress={() => this.props.onPress()}>
        <Text style={styles.customBtnText}> {this.props.text} </Text>
      </TouchableOpacity>
    );
  }
}

export default RedButton;
