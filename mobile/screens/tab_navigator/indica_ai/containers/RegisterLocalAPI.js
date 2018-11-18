import React, { Component } from "react";
import {
  Text,
  ScrollView,
  Alert,
  View,
  StyleSheet
} from "react-native";
import { withNavigation, createStackNavigator } from 'react-navigation';
import RegisterAPIForm from '../components/RegisterAPIForm';
import SuccessModal from '../components/SuccessModal';
import ErrorModal from '../components/ErrorModal';

class RegisterLocalAPI extends Component {

  constructor(props) {
    super(props);
    this.state = {
      requestStatus: null,
      selectedCategories: [],
      local: {},
      successModalVisible: false,
      errorModalVisible: false,
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
    if (this.state.requestStatus === "SUCCESS") {
      this.setState({ successModalVisible: true })
    } else if (this.state.requestStatus === "FAILED") {
      this.setState({ errorModalVisible: true })
    }
    return (
      <View style={styles.container}>
        <RegisterAPIForm
          sendDataToTheForm={this.takeDataFromTheForm}
          setSelectedCategories={this.setSelectedCategories}
        />
        <SuccessModal
          onCancel={() => this.setState({ successModalVisible: false })}
          visible={this.state.successModalVisible}
          message = {"Local cadastrado com sucesso"}
        />
        <ErrorModal
          onCancel={() => this.setState({ errorModalVisible: false })}
          visible={this.state.errorModalVisible}
          message = {"Erro ao cadastrar o local"}
        />
      </View>
    );
  }
}

export default withNavigation(RegisterLocalAPI);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
