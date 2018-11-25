import React from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default class ImageModal extends React.Component {

  render() {
    return (
      <Modal animationType="fade" transparent={true} visible={this.props.visible} onRequestClose={() => null}>
        <View style={styles.modalContainer}>

          <View style={styles.boxContainer}>
            <Text style={styles.boxTitle}>Enviar foto ?</Text>
            <View style={styles.buttonContainer}>

              <TouchableOpacity style={[styles.button, styles.sendButton]} onPress={this.props.onSendImage}>
                <Text style={styles.buttonText}>Enviar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={this.props.onCancel}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  boxContainer: {
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    width: 240,
  },
  boxTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 8
  },
  buttonContainer: {
    marginTop: 10,
    height: 40,
    width: 130,
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  sendButton: {
    backgroundColor: 'green',
    width: 65,
  },
  cancelButton: {
    backgroundColor: 'red',
    marginLeft: 10,
    width: 65,
  },
  buttonText: {
    alignItems: 'center',
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 15,
  },

});
