import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TextBase,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionSearchLocals } from "../actions/searchBar";
import Local from "../components/Local";

export class SearchBar extends Component {

    state ={
      inputValue: "",
      locals: []
        };


  inputChange = value => {
    this.setState({
      inputValue: value
    });
  };


  search = name => {
    console.log(name);  
    const url = `https://indicaai.herokuapp.com/locals/name/${name}` 
    fetch( url, {   
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "aplication/json"
      }
    }) 
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          locals: responseJson,
        })
        console.log(responseJson);
        this.props.onChangeLocals({locals: this.state.locals});
      })
      .catch(error => {
        console.log(error);
      });
  };

    

  render() { 
    const { inputValue } = this.state;
    const { locals } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.containerSearch}>
          <TextInput
            onChangeText={value => this.inputChange((value: text))}
            value={inputValue}
            placeholder='Buscar Indicação'
            style={{
              width: 295,
              borderWidth: 1,
              borderColor: "gray",
              borderBottomLeftRadius: 5,
              borderTopLeftRadius: 5,
              height: 50,
              padding: 5
            }}
          />
          <TouchableOpacity onPress={() => this.search(this.state.inputValue)}>
            <View style={styles.buttonSearch}>
              <Ionicons
                name="md-search"
                size={30}
                style={{
                  color: "#FFF",
                  padding: 10
                }}
              />
            </View>
          </TouchableOpacity>
            <ScrollView>
              {locals
              .map(local => <Local name={local.name} />)}
            </ScrollView>
        </View>
      </View>
    );
  };
};

const mapStateToProps = state => {
  return {
    locals: state.locals
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLocals: (locals_params) => {
      const locals = {
        locals: locals_params
      };
      console.log('dispatch');
      return dispatch(actionSearchLocals(locals));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (SearchBar);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  containerSearch: {
    marginTop: 5,
    flexDirection: 'row'
  },
  localList: {
    padding: 20
  },
  buttonSearch: {
    height: 50,
    backgroundColor: '#0AACCC',
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  }
});
