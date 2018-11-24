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
          <Text style={styles.hoursFormTitle}>Horario de funcionamento:</Text>
          <View style={styles.hoursOption}>
            <TouchableOpacity onPress={() => {this.setState({eachDay: true, week: false})}}>
              <Text style={styles.hoursFormOption}>Diario</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.setState({week: true, eachDay: false})}}>
              <Text style={styles.hoursFormOption}>Semanal</Text>
            </TouchableOpacity>
          </View>
        </View>

        {this.state.eachDay ? this.displayHoursEachDay() : null}
        {this.state.week ? this.displayHoursWeek() : null}

        <View style={styles.button}>
          <Button block info onPress={
            () => {
              if (!(this.state.name)) {
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

    const days = [{id: 1, day: 'Dom'}, {id: 2, day: 'Seg'}, {id: 3, day: 'Ter'}, {id: 4, day: 'Qua'}, {id: 5, day: 'Qui'}, {id: 6, day: 'Sex'}, {id: 7, day: 'Sab'}];

    return(
      <View style={{top: 20}}>
        <View style={styles.hoursForm}>
          {days.map( day =>
            <View
              style={styles.dayBorder}
              key={day.id}
            >
              <Text style={styles.day}>
                {day.day}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.hoursForm}>
          {days.map( day =>
            <HoursSelect
              option='Abre'
              day={day.id}
              takeOpeningHours={this.props.takeOpeningHours}
              key={day.id}
            />
          )}
        </View>
        <View style={styles.hoursForm}>
          {days.map( day =>
            <HoursSelect
              option='Fecha'
              day={day.id}
              takeOpeningHours={this.props.takeOpeningHours}
              key={day.id}
            />
          )}
        </View>
      </View>
    );
  }

  displayHoursWeek() {

    const days = [{id: 1, day: 'Seg a Sex'}, {id: 2, day: 'Sab e Dom'}];

    return(
      <View style={{top: 20}}>
        <View style={styles.hoursForm}>
          {days.map( day =>
            <View
              style={styles.dayBorder}
              key={day.id}
            >
              <Text style={styles.day}>
                {day.day}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.hoursForm}>
          {days.map( day =>
            <HoursSelect
              option='Abre'
              week={true}
              day={day.id}
              takeOpeningHours={this.props.takeOpeningHours}
              key={day.id}
            />
          )}
        </View>
        <View style={styles.hoursForm}>
          {days.map( day =>
            <HoursSelect
              option='Fecha'
              week={true}
              day={day.id}
              takeOpeningHours={this.props.takeOpeningHours}
              key={day.id}
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
    top: 50,
    padding: 10,
  },
  hoursOption:{
    flexDirection: 'row'
  },
  hoursForm: {
    top: 20,
    flexDirection: 'row'
  },
  dayBorder: {
    borderWidth: 1,
    flex: 1
  },
  hoursFormOption: {
    borderWidth: 1,
    borderRadius: 2,
    padding: 3,
    marginLeft: 5
  },
  day: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  hoursFormTitle: {
    fontSize: 15,
    fontWeight: 'bold'
  }
});
