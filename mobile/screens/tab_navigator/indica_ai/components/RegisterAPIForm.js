import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Alert
} from "react-native";
import {
  Container,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Textarea,
  Button
} from 'native-base'
import CategorySelect from './CategorySelect.js';
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
      errorModalVisible: false
    };
  }

  onValueChange(value) {
    this.setState({
      selected: value,
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <CategorySelect
          setSelectedCategories={this.props.setSelectedCategories}
        />
        <Item
          style={styles.pickerForm}
          regular
        >
          <Input placeholder='Nome'
            onChangeText={(name) => this.setState({ name })}
          />
        </Item>
        <TextInput
          editable = {true}
          maxLength = {150}
          numberOfLines = {5}
          placeholder="Adicione uma descrição do local"
          placeholderTextColor='black'
          onChangeText={(description) => this.setState({ description })} />
        <View style={styles.button}>
          <Button block info onPress={
            () => {
              if (!(this.state.name && this.state.description)) {
                this.setState({ errorModalVisible: true })
              } else {
                this.props.sendDataToTheForm(this.state.name, this.state.description)
              }
            }

          }>
            <Text style={{ color: "white" }}>Confirmar</Text>
          </Button>
        </View>
        <WarningModal
          onCancel={() => this.setState({ errorModalVisible: false })}
          visible={this.state.errorModalVisible}
          message = {"Erro no nome ou descrição"}
        />
      </Container>
    );

  }

}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: "white",
    padding: 20,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  pickerForm: {
    top: 65,
    marginBottom: 74
  },
  button: {
    padding: 10,
  }
});
