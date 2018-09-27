import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
} from 'react-native';
import Dialog from "react-native-dialog";

export default class ErrorDialog extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isDialogVisible: false,
    };
  }
  render(){
    return(
      <Dialog.Container visible={this.props.isDialogVisible}>
        <View style={{width: '90%',flexDirection: 'column'}}>
            <Text> {this.props.messageError} </Text>
            <Button
              title="Cancelar"
              onPress={this.props.backButton}
              color="purple"
            />
        </View>
      </Dialog.Container>
    )
  }
}
