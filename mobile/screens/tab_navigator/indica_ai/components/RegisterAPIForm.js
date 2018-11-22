import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity
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
      eachDay: false,
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
        <Textarea
          rowSpan={5}
          bordered
          placeholder="Descrição"
          onChangeText={(description) => this.setState({ description })} />

        <View style={styles.hoursForm}>
          <TouchableOpacity onPress={() => {this.setState({eachDay: true})}}>
            <Text style={{borderWidth: 1}}>Para cada dia</Text>
          </TouchableOpacity>
        </View>

        {this.state.eachDay ? this.displayHoursEachDay() : null}

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

  displayHoursEachDay() {

    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    const day = [0, 1, 2, 3, 4, 5, 6];

    return(
      <View style={{top: 20}}>
        <View style={styles.hoursForm}>
          {days.map( day =>
            <View style={styles.dayBorder}>
              <Text
                style={styles.day}
                key={day}
              >
                {day}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.hoursForm}>
          {day.map( day =>
            <HoursSelect
              option='Abre'
              takeOpeningHours={this.props.takeOpeningHours}
              key={day}
            />
          )}
        </View>
        <View style={styles.hoursForm}>
          {day.map( day =>
            <HoursSelect
              option='Fecha'
              takeOpeningHours={this.props.takeOpeningHours}
              key={day}
            />
          )}
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: "white",
    padding: 20,
    left: 0,
    right: 0,
    flex: 1
  },
  pickerForm: {
    top: 65,
    marginBottom: 74
  },
  button: {
    top: 20,
    padding: 10,
  },
  hoursForm: {
    top: 20,
    flexDirection: 'row'
  },
  dayBorder: {
    borderWidth: 1,
    flex: 1
  },
  day: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
