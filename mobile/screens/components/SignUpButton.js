import styles from '../tab_navigator/vendas/styles';
import React from 'react';
import {Text} from 'react-native';
import {Button} from 'native-base';

class SignUpButton extends React.Component{
  render(){
    return(
        <Button
        bordered light block
        onPress={() => this.props.onPress()}
        color='transparent'
        >
          <Text style={styles.signUpBtn}>CADASTRAR</Text>
        </Button>
    );
  }
}

export default SignUpButton;
