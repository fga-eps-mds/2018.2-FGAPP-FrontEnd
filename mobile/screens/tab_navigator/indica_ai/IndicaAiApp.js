import React, { Component } from "react";
import {
  View,
  StyleSheet
} from "react-native";
import SearchBar from "./containers/searchBar";
import ListLocals from './containers/ListLocals'


class FirstScreen extends Component {

  constructor(props) {
      super(props);
      this.state = {
          locals: []
      };
  }
  
  // Function responsable to set state equal to
  // SearchBar, coming by onChangeLocals
  changeLocals = vetor => {
    this.setState({
      locals: vetor
    });
  };

  render() {
    return (
        <View style={styles.container}>
            <SearchBar onChangeLocals={this.changeLocals} />  
            <ListLocals locals={this.state.locals} />
        </View>
    );
  }
}

export default FirstScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#FFF"
  }

});
