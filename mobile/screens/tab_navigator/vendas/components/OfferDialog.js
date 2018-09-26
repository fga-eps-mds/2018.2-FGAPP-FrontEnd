import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
} from 'react-native';
import Dialog from "react-native-dialog";

export default class OfferDialog extends Component{
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
           <TextInput

              editable = {true}
              maxLength = {120}
              multiline = {true}
              numberOfLines = {5}
              placeholder = {'Digite sua mensagem'}
              onChangeText = {this.props.onChangeText}
           />
          <View style ={{height: 30, flexDirection: 'row', justifyContent:'flex-end'}}>
            <Text
            textAlignVertical= 'top'
            >
            {this.props.characters} </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '35%', height: 50}}>
              <Button
                title="Cancelar"
                onPress={this.props.backButton}
                color="purple"
              />
            </View>
            <View style={{width: '30%', height: 50}} />
            <View style={{width: '35%', height: 50}} >
              <Button
                title="Confirmar"
                onPress={this.props.sendButton}
                color="#0EAC6F"
              />
            </View>
          </View>
        </View>
      </Dialog.Container>
    )
  }
}
