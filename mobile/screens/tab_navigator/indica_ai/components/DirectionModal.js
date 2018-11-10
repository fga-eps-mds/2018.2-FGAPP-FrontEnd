import React from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
export default class SuccessModal extends React.Component{
    render(){
      return (
        <Modal animationType="fade" transparent={true} visible={this.props.visible} onRequestClose={() => null}>
            <View style={styles.modalContainer}>
            <View style={styles.boxContainer}>
              <Icon
              name='ios-navigate'
              color='blue'
              size={50}
              />
              <Text style={styles.boxTitle}>Qual o meio de locomoção?</Text>
              <View style={styles.buttonContainer}>
                  <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={()=>{this.props.handleGetDirections("driving")}}>
                <Icon
                name='ios-car'
                color='#fff'
                size={20}
                />
                  <Text style={styles.buttonText}>Carro</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={ ()=>{this.props.handleGetDirections("walking")}}>
                <Icon
                name='ios-walk'
                color='#fff'
                size={20}
                />
                  <Text style={styles.buttonText}>Andando</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={ ()=>{this.props.handleGetDirections("bicycling")}}>
                <Icon
                name='ios-bicycle'
                color='#fff'
                size={20}
                />
                  <Text style={styles.buttonText}>Bike</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={ ()=>{this.props.handleGetDirections("transit")}}>
                <Icon
                name='ios-bus'
                color='#fff'
                size={20}
                />
                  <Text style={styles.buttonText}>Ônibus</Text>
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
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    width: 300,
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
    justifyContent: 'space-between'
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginHorizontal: 2
  },
  cancelButton: {
    backgroundColor: 'blue',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 12,
  },

});
