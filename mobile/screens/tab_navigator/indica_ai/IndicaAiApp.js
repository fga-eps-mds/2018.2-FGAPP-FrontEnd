import React, { Component } from "react";
import {
  View,
  StyleSheet
} from "react-native";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducers from './reducers'
import SearchBar from "./containers/searchBar";
import ListLocals from './containers/ListLocals'

const store = createStore(rootReducers)

class SearchScreen extends Component {

  render() {

    console.log('STORE')
    console.log(store.getState())
    console.log('FINISH')

    return (
        <Provider store={store}>
            <View style={styles.container}>
                <SearchBar />
                <ListLocals />
            </View>
       </Provider>
    );
  }
}

export default SearchScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#FFF"
  }

});
