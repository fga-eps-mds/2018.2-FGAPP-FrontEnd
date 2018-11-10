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

              <TouchableOpacity>
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
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 3,
  },
  sendButton: {
    backgroundColor: 'green',
  },
  cancelButton: {
    backgroundColor: 'red',
    marginLeft: 10,

  },
  buttonText: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 12,
  },

});
