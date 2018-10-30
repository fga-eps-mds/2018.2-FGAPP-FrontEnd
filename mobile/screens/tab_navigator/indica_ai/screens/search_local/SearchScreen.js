import React, { Component } from "react";
import {
  View,
  StyleSheet
} from "react-native";
import { Spinner } from 'native-base';
import { connect } from 'react-redux';
import SearchBar from "../../containers/searchBar";
import ListLocals from '../../containers/ListLocals'


class SearchScreen extends Component {
  
  render() {
      return (
          <View style={styles.container}>
              <SearchBar />
              <ListLocals />
          </View>
      );
  }
}

export default SearchScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
  }

});
