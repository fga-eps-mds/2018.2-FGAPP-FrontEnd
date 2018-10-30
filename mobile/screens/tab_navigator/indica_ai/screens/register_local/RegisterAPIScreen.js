import React, { Component } from "react";
import {
  View,
  StyleSheet
} from "react-native";
import RegisterLocalAPI from '../../containers/RegisterLocalAPI.js';


class RegisterAPIScreen extends Component {

  render() {
      return (
          <View style={styles.container}>
              <RegisterLocalAPI />
          </View>
      );
  }
}

export default RegisterScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
  }

});
