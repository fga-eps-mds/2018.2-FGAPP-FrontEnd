import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import {
  Button,
  Container
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CategorySelect from './CategorySelect.js';
import HoursSelect from './HoursSelect.js';
import { withNavigation } from 'react-navigation';
import { createStackNavigator } from 'react-navigation';
import WarningModal from '../components/WarningModal';

export default class RegisterAPIForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      name: null,
      description: null,
      errorModalVisible: false,
      eachDay: false,
      week: false
    };
  }

  onValueChange(value) {
    this.setState({
      selected: value,
    });
  }

  render() {
    return (
      <KeyboardAwareScrollView style={{width: '100%', padding: 20}}>
        <Container>

            <TextInput
              style={styles.inputName}
              placeholder='Nome'
              placeholderTextColor='black'
              underlineColorAndroid='transparent'
              autoCapitalize='none'
              onChangeText={(name) => this.setState({ name })}
            />

        </Container>
      </KeyboardAwareScrollView>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    position: 'absolute',
    padding: 15,
    flex: 1,
    left: 0,
    right: 0
  },
  inputName: {
    height: 40,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 5
  },
  inputDescription: {
    top: 20,
    height: 55,
    borderWidth: 1,
    borderRadius: 5
  }
});
