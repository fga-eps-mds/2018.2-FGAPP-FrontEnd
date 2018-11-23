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
      day: '',
      opens: '',
      closes: '',
      opening_hours: []
    };
  }

  _postForm = async (name, description) => {
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
      "opening_hours": [],
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

    sla = this.state.opens
    sla1 = this.state.closes

    takeOpeningHours = (day, opens, closes) => {
      if(opens) {
        this.setState({opens})
      }
      if(closes) {
        this.setState({closes})
      }
      if(this.state.opens && this.state.closes){
        obj = {day, sla, sla1}
        console.log(obj);
        this.setState({opens: ''})
        this.setState({closes: ''})
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
