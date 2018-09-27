import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TextBase
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchLocals } from "../actions/searchBar";

class SearchBar extends Component {
  state = {
    inputValue: ""
  };

  inputChange = value => {
    this.setState({
      inputValue: value
    });
  };

  searchLocals = text => {
    alert(text);
    this.props.dispatch(searchLocals(text));
    this.setState({ inputValue: "" });
  };

  search = name => {
    const url = `https://indicaai.herokuapp.com/locals/name/${name}`;
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "aplication/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { inputValue } = this.state;

    return (
      <View style={{ flexDirection: "row", marginHorizontal: 1, marginTop: 1 }}>
        <TextInput
          onChangeText={value => this.inputChange((value: text))}
          value={inputValue}
          placeholder="Buscar Indicação"
          style={{
            borderWidth: 1,
            borderColor: "gray",
            backgroundColor: "#eaeaea",
            height: 50,
            flex: 1,
            padding: 5
          }}
        />
        <TouchableOpacity onPress={() => this.search(this.state.inputValue)}>
          <View style={{ height: 50, backgroundColor: "#eaeaea" }}>
            <Ionicons
              name="md-search"
              size={30}
              style={{
                color: "#0AACCC",
                padding: 10
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  inputValue: state.text
});

export default connect(mapStateToProps)(SearchBar);
