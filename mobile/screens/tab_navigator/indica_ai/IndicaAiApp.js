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
import { store } from "./redurces/store";
import Local from './containers/Local';

state = {
  localName: "SHOW_ALL",
};
// console.log(store);

class FirstScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Provider store={store} >
          <SearchBar />
        </Provider>
      </View>
      // <View>
      //   <Provider>
      //     <Local/>
      //   </Provider>
      // </View>
    );
  }
}
export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: '#FFF',
  },
});
