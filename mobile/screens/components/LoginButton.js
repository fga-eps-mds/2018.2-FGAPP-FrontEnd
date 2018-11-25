import styles from '../tab_navigator/vendas/styles';
import React from 'react';
import {Text} from 'react-native';
import {Button} from 'native-base';

class LoginButton extends React.Component{
  render(){
    return(
        <Button
        light block
        onPress={() => this.props.onPress()}
        >
          <Text style={styles.loginBtn}>ENTRAR</Text>
        </Button>
    );
  }
}

export default LoginButton;
