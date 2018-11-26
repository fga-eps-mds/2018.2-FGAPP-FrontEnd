import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchAction } from '../actions'
import InputWithButton from '../components/InputWithButton.js'


export class SearchBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchAction: props.searchAction
    };
  }

  // Fucntion responsable to search user's input in the APi
  // and set the state equal to the result
  search = name => {
    if (name.length !== 0) {
      const url = `${process.env.INDICA_AI_API}/locals/name/${name}`
      fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "aplication/json"
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          this.props.searchAction(responseJson[0])
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      const url = fetch(`https://dev-indicaai.herokuapp.com/locals/`, {
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
  };

  render() {

    return (
      <InputWithButton
        label='Buscar Indicação'
        icon='search'
        onPress={name => this.search(name)}
      />
    );
  };
};

const mapStateToProps = store => ({})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ searchAction }, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
