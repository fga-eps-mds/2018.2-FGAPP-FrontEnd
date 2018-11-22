import React, { Component } from "react";
import {
  Text,
  ScrollView,
  Alert
} from "react-native";
import { withNavigation, createStackNavigator } from 'react-navigation';
import RegisterAPIForm from '../components/RegisterAPIForm.js'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchAction } from '../actions'

class RegisterLocalAPI extends Component {

  constructor(props) {
    super(props);
    this.state = {
      requestStatus: null,
      selectedCategories: [],
      local: {}
    };
  }

  _postForm = async (name, description) => {
    const { selectedCategories } = this.state
    const categories = Array()
    for (const index in selectedCategories) {
      categories[index] = { "category_id": selectedCategories[index] };
    }
    const url = `${process.env.INDICA_AI_API}/locals/`;
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
      if (jsonResponse['status'] === "SUCCESS") {
        this.setState({ requestStatus: "SUCCESS" })
        this.setState({
          local: jsonResponse["data"][0]
        })
        this._updateFunction();
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
  _updateFunction = () => {
    fetch(`${process.env.INDICA_AI_API}/locals/`, {
     method: "GET",
     headers: {
       Accept: "application/json",
       "Content-Type": "aplication/json"
     }
   })
   .then(response => response.json())
   .then(responseJson => {
     this.props.searchAction(responseJson)
   })
   .catch(error => {
     console.log(error);
   });
 
 }
  render() {
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
      />
    );
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({ searchAction }, dispatch)
)
export default withNavigation(connect(
null,
mapDispatchToProps
)(RegisterLocalAPI));
