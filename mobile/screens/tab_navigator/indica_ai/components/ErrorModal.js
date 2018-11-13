import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
export default class ErrorModal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      message: props.message
    }
  }

    render(){
      const { message } = this.state
      return (
        <Modal animationType="fade" transparent={true} visible={this.props.visible} onRequestClose={() => null}>
            <View style={styles.modalContainer}>
            <View style={styles.boxContainer}>
              <Icon
              name='close'
              color='red'
              size={50}
              />
              <Text style={styles.boxTitle}>{message}.</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={this.props.onCancel}>
                  <Text style={styles.buttonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      );
    }
}

const styles = StyleSheet.create({

  modalContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContainer: {
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    width: 280,
  },
  boxTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 8
  },
  buttonContainer: {
    marginTop: 10,
    height: 40,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  cancelButton: {
    backgroundColor: 'red',
    marginHorizontal: 80
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 12,
  },

});
