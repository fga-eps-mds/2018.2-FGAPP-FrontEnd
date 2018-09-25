import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  PixelRatio
} from "react-native";
import SearchBar from "./containers/searchBar";
import { Provider } from "react-redux";
import store from './store';


class FirstScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
          <Image
            source={require("./images/logo.png")}
            style={{
              width: 317,
              height: 115,
              alignSelf: 'center'
            }}
          />
          <Provider store={store}>
            <SearchBar />
          </Provider>
      </View>
    );
  }
}
export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start"
  }
});
