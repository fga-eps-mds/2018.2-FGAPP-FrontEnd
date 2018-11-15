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
      <View style={{flexDirection: 'column'}}>
        <Dialog.Container visible={this.props.isDialogVisible}>
            <Dialog.Title style={{paddingTop: 0, paddingBottom: 5}}>
                Erro
              </Dialog.Title>
              <Dialog.Description>
                {this.props.messageError}
              </Dialog.Description>
              <Dialog.Button
                label="Cancelar"
                onPress={this.props.backButton}
                color="purple"  
              />
        </Dialog.Container>
      </View>
    )
  }
}
