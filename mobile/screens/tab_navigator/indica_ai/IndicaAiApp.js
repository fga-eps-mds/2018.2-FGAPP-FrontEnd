import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  PixelRatio,
  ScrollView
} from "react-native";
import SearchBar from "./containers/searchBar";
import { Provider } from "react-redux";
import store from "./redurces/store";
import ListLocals from './containers/ListLocals'

class FirstScreen extends Component {

  constructor(props) {
      super(props);
      this.state = {
          locals: []
      };
  }

  changeLocals = vetor => {
    this.setState({
      locals: vetor
    });
    console.log(this.state.locals);
  };

  render() {
    return (
        <View style={styles.container}>
          <Provider store={store}>
            <SearchBar onChangeLocals={this.changeLocals} />  
          </Provider>
          <Provider store={store}>
            <ListLocals locals={this.state.locals}/>
          </Provider>
        </View>
    );
  }
}

const mapStateToProps = () => {
  console.log(store.getState()); 
  return {
    searchBar: {} 
  };
};

export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#FFF"
  }
});
