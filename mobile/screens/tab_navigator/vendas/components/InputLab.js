import React from 'react';
import {Item, Label, Input} from 'native-base';

class InputLab extends React.Component{
  render(){
    return(
      <Item floatingLabel>
        <Label>{this.props.nameLabel}</Label>
        <Input
          style={{ color: 'black' }}
          {...this.props}
        />
      </Item>
    );
  }
}

export default InputLab;
