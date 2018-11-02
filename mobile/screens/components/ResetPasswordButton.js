import styles from '../tab_navigator/vendas/styles';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';


class ResetPasswordButton extends React.Component{
  render(){
    return(

        <TouchableOpacity onPress={() => this.props.onPress()}>
          <Text style={{color:  'white', textDecorationLine: 'underline'}}>
            Esqueci minha senha
          </Text>
        </TouchableOpacity>
    );
  }
}

export default ResetPasswordButton;
