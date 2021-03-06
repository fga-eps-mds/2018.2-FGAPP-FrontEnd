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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchAction } from '../actions'

class RegisterLocalAPI extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedCategories: [],
      local: {},
      successModalVisible: false,
      errorModalVisible: false,
      open: '',
      close: '',
      opening_hours: []
    };
  }

  _postForm = async (name, telephone, description) => {
    const { opening_hours } = this.state
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
      "opening_hours": opening_hours,
      "telephone": telephone,
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
        this.setState({successModalVisible: true})
        this.setState({
          local: jsonResponse["data"][0]
        })
        this._updateFunction();
      } else {
        this.setState({ errorModalVisible: true })
      }
    } catch (error) {
      console.error(error);
}
  }

  takeDataFromTheForm = (name, phone, description) => {
    phone ? telephone=phone.toString() : telephone=null
    this._postForm(name, telephone, description);
  }

  setSelectedCategories = (selectedCategories) => {
    this.setState({
      selectedCategories: selectedCategories
    })
  }

  afterRegister(){
    this.setState({ successModalVisible: false })
    this.props.navigation.navigate('LocalDetails', {local: this.state.local})
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

    let opening_hours = [];
    let obj = {};

    opens = this.state.open
    closes = this.state.close

    takeOpeningHours = (day, open, close) => {
      if (open) {
        this.setState({ open })
      }
      if (close) {
        this.setState({ close })
      }
      if (this.state.open && this.state.close) {
        if (day == 8 || day == 9) {
          if (day == 8) {
            for (var day = 2; day < 7; day++) {
              obj = { day, opens, closes }
              this.state.opening_hours = [...this.state.opening_hours, obj];
            }
            this.setState({ open: '' })
            this.setState({ close: '' })
          } else {
            for (var day = 1; day < 8; day = day + 6) {
              obj = { day, opens, closes }
              this.state.opening_hours = [...this.state.opening_hours, obj];
            }
            this.setState({ open: '' })
            this.setState({ close: '' })
          }
        } else {
          obj = { day, opens, closes }
          this.state.opening_hours = [...this.state.opening_hours, obj];
          this.setState({ open: '' })
          this.setState({ close: '' })
        }
      }
    }

    return (
      <View style={styles.container}>
        <RegisterAPIForm
          sendDataToTheForm={this.takeDataFromTheForm}
          setSelectedCategories={this.setSelectedCategories}
          takeOpeningHours={takeOpeningHours}
        />
        <SuccessModal
          onCancel={() => this.afterRegister()}
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

const mapDispatchToProps = dispatch => (
  bindActionCreators({ searchAction }, dispatch)
)
export default withNavigation(connect(
  null,
  mapDispatchToProps
)(RegisterLocalAPI));

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position:"absolute",
    backgroundColor: "white",
    top:0,
    bottom:0,
    left:0,
    right:0
  }
});
