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
import HoursSelect from './HoursSelect.js';
import { withNavigation } from 'react-navigation';
import { createStackNavigator } from 'react-navigation';

export default class RegisterAPIForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      name: null,
      description: null,
    };
  }

  onValueChange(value) {
    this.setState({
      selected: value,
    });
  }

  render() {

    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

    return (
      <Container style={styles.container}>
          {days.map( day =>
            <View style={styles.hours}>
              <HoursSelect
                option='Abre'
                takeOpeningHours={this.props.takeOpeningHours}
                key={day}
              />
              <HoursSelect
                option='Fecha'
                takeOpeningHours={this.props.takeOpeningHours}
                key={day}
              />
            </View>
          )}
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
        <Textarea
          rowSpan={5}
          bordered
          placeholder="Descrição"
          onChangeText={(description) => this.setState({ description })} />
        <View style={styles.button}>
          <Button block info onPress={
            () => {
              if (!(this.state.name && this.state.description)) {
                Alert.alert(
                  'Atenção!',
                  "Os campos 'Nome' ou 'Descrição' não podem estar vazios",
                  [
                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                  ],
                  { cancelable: false }
                )
              } else {
                this.props.sendDataToTheForm(this.state.name, this.state.description)
              }
            }

          }>
            <Text style={{ color: "white" }}>Confirmar</Text>
          </Button>
        </View>
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
  },
  hours: {
    flexDirection: 'column'
  }
});
