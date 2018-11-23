import React, { Component } from "react";
import {
  Text,
  ScrollView,
  Alert
} from "react-native";
import { withNavigation, createStackNavigator } from 'react-navigation';
import RegisterAPIForm from '../components/RegisterAPIForm.js'

class RegisterLocalAPI extends Component {

  constructor(props) {
    super(props);
    this.state = {
      requestStatus: null,
      selectedCategories: [],
      local: {},
      open: '',
      close: '',
      opening_hours: []
    };
  }

  _postForm = async (name, description) => {
    const { opening_hours } = this.state
    console.log();
    const { selectedCategories } = this.state
    const categories = Array()
    for (const index in selectedCategories) {
      categories[index] = { "category_id": selectedCategories[index] };
    }
    const url = "https://indicaai.herokuapp.com/locals/";
    const jsonTest = JSON.stringify({
      "name": name,
      "categories": categories,
      "description": description,
      "address": this.props.address,
      "latitude": this.props.latitude,
      "longitude": this.props.longitude,
      "opening_hours": JSON.stringify(opening_hours),
      "telephone": undefined,
    });
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: jsonTest,
      })
      const jsonResponse = await response.json()
      console.log(jsonResponse);
      if (jsonResponse['status'] === "SUCCESS") {
        this.setState({ requestStatus: "SUCCESS" })
        this.setState({
          local: jsonResponse["data"][0]
        })
      } else {
        this.setState({ requestStatus: "FAILED" })
      }
    } catch (error) {
      console.error(error);
    }
  }

  takeDataFromTheForm = (name, description) => {
    this._postForm(name, description);
  }

  setSelectedCategories = (selectedCategories) => {
    this.setState({
      selectedCategories: selectedCategories
    })
  }

  render() {

    let opening_hours = [];
    let obj = {};

    opens = this.state.open
    closes = this.state.close

    takeOpeningHours = (day, open, close) => {
      if(open) {
        this.setState({open})
      }
      if(close) {
        this.setState({close})
      }
      if(this.state.open && this.state.close){
        obj = {day, opens, closes}
        console.log(obj);
        this.state.opening_hours = [ ...this.state.opening_hours, obj];
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++');
        console.log(this.state.opening_hours);
        this.setState({open: ''})
        this.setState({close: ''})
      }
    }

    if (this.state.requestStatus === "SUCCESS") {
      Alert.alert(
        'Local cadastrado com sucesso!',
        "",
        [
          {
            text: 'OK', onPress: () => this.props.navigation.navigate('LocalDetails', {
              local: this.state.local
            })
          }
        ],
        { cancelable: false }
      )

    } else if (this.state.requestStatus === "FAILED") {
      Alert.alert(
        'Ooops!',
        "Houve um erro ao cadastrar esse local, tente novamente mais tarde",
        [
          { text: 'OK', onPress: () => this.props.navigation.navigate("Register") }
        ],
        { cancelable: false }
      )
    }
    return (
      <RegisterAPIForm
        sendDataToTheForm={this.takeDataFromTheForm}
        setSelectedCategories={this.setSelectedCategories}
        takeOpeningHours={takeOpeningHours}
      />
    );
  }
}
export default withNavigation(RegisterLocalAPI);
