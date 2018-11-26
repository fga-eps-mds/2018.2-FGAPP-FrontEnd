import styles from '../tab_navigator/vendas/styles';
import React from 'react';
import {Text} from 'react-native';
import {Button} from 'native-base';

class ConfirmSignUpBtn extends React.Component{
  render(){
    return(
        <Button
        light block
        onPress={() => this.props.onPress()}
        >
          <Text style={styles.loginBtn}>CADASTRAR</Text>
        </Button>
    );
  }
}

export default ConfirmSignUpBtn;
