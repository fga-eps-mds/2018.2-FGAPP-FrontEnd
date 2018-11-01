import styles from './styles';
import React from 'react';
import {Text} from 'react-native';
import {Content, Button} from 'native-base';

class APButton extends React.Component{
  render(){
    return(
      <Content>
        <Button
        style={styles.button}
        onPress={() => this.props.onPress()}
        success
        >
          <Text style={{color: 'white'}}>{this.props.text}</Text>
        </Button>
      </Content>
    );
  }
}

export default APButton;
