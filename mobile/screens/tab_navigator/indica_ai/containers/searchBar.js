import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchLocals } from "../actions/searchBar";

class SearchBar extends Component {
  state = {
    inputValue: ''
  };

  inputChange = value => {
    this.setState({
      inputValue: value
    });
  }

  searchLocals = text => {
    alert(text)
    this.props.dispatch(searchLocals(text))
    this.setState({inputValue: ''})
  }

  render() {


    const{
      newText
    } = this.props;

    console.log(this.state)
    const { inputValue } = this.state;

    return (
      <View style={{ flexDirection: "row", marginHorizontal: 1, marginTop: 1 }}>
        <TextInput
          onChangeText={(value) => this.inputChange(value: text)}
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
        <TouchableOpacity onPress={() => this.searchLocals(this.state.inputValue)}>
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
        <Text>{newText}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => (
  console.log('ttt'),{
  inputValue: state.text
});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators({ searchLocals }, dispatch);

export default connect(mapStateToProps)(SearchBar);
