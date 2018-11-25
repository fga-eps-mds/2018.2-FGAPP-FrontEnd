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
  Container,
  Form,
  Item,
  Label,
  Input,
  Rigth
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
      telephone: null,
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

  showHoursFormDay() {
    !this.state.eachDay ?
      this.setState({eachDay: true, week: false})
    :
      this.setState({eachDay: false});
  }

  showHoursFormWeek() {
    !this.state.week ?
      this.setState({week: true, eachDay: false})
    :
      this.setState({week: false});
  }

  render() {
    return (
      <KeyboardAwareScrollView style={{flex: 1, width: '100%', padding: 20}}>
        <Container>

          <View>
            <TextInput
              style={styles.inputName}
              placeholder='Nome'
              placeholderTextColor='gray'
              underlineColorAndroid='transparent'
              autoCapitalize='none'
              onChangeText={(name) => this.setState({ name })}
            />
          </View>

          <TextInput
            placeholder='Telefone'
            keyboardType={'numeric'}
            onhxangeText={(telephone) => this.setState({ telephone })}
          />

          <View style={styles.inputDescription}>
            <TextInput
              style={{fontSize: 15}}
              multiline={true}
              maxLength = {150}
              numberOfLines = {3}
              placeholder="Descrição"
              placeholderTextColor='gray'
              onChangeText={(description) => this.setState({ description })}
            />
          </View>

          <View style={styles.pickerForm}>
            <CategorySelect
              style={{color: 'gray'}}
              setSelectedCategories={this.props.setSelectedCategories}
            />
          </View>

          <View style={styles.hoursForm}>
            <Text style={styles.hoursFormTitle}>Horario de funcionamento:</Text>
            <View style={styles.hoursOption}>
              <TouchableOpacity onPress={() => {this.showHoursFormDay()}}>
                <Text style={styles.hoursFormOption}>Diario</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {this.showHoursFormWeek()}}>
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
                  this.props.sendDataToTheForm(this.state.name, this.state.telephone, this.state.description)
                }
              }}>
              <Text style={{ color: "white" }}>Confirmar</Text>
            </Button>
          </View>

        </Container>
      </KeyboardAwareScrollView>
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
    backgroundColor: "white",
    position: 'absolute',
    padding: 15,
    flex: 1,
    left: 0,
    right: 0
  },
  inputName: {
    paddingLeft: 8,
    height: 40,
    width: '100%',
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 5
  },
  inputDescription: {
    paddingLeft: 8,
    top: 20,
    height: 65,
    borderWidth: 1,
    borderRadius: 5
  },
  pickerForm: {
    top: 40,
    height: 38,
    borderWidth: 1,
    borderRadius: 5
  },
  button: {
    top: 80,
    padding: 10,
  },
  hoursOption:{
    flexDirection: 'row'
  },
  hoursForm: {
    top: 60,
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
