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


export class SearchBar extends Component {

    constructor(props) {
        super(props)
        this.state ={
            inputValue: "",
            searchAction: props.searchAction
        };
    }

  // Function reposable to set the component state, inputValue,
  // equal to user's input in TextInput 
  inputChange = value => {
    this.setState({
      inputValue: value
    });
  };

  componentWillReceiveProps(newProps) {
      if(newProps.locals !== undefined){
          this.setState({locals: newProps.locals })
      }
  }

  // Fucntion responsable to search user's input in the APi
  // and set the state equal to the result 
  search = name => {
    if(name.length !== 0) { 
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
          this.props.searchAction(responseJson[0])
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() { 
    const { inputValue } = this.state;
    const { searchAction } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.containerSearch}>
          <TextInput
            onChangeText={value => this.inputChange((value: text))}
            value={inputValue}
            placeholder='Buscar Indicação'
            style={styles.TextInput}
          />
          <TouchableOpacity onPress={() => this.search(this.state.inputValue)}>
            <View style={styles.buttonSearch}>
              <Ionicons name="md-search" size={30} style={styles.magnifier} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
};

const mapStateToProps = store => ({
    locals: store.searchReducer.locals
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({ searchAction }, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginHorizontal: 10,
  },

  containerSearch: {
    marginTop: 5,
    flexDirection: 'row'
  },

  TextInput: {
    width: 295,
    borderWidth: 1,
    borderColor: "gray",
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    height: 50,
    padding: 5
  },

  buttonSearch: {
    height: 50,
    backgroundColor: '#0AACCC',
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },

  magnifier: {
    color: "#FFF",
    padding: 10
  }

});
