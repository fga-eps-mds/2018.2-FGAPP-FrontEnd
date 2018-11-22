import React, { Component } from "react";
import {
  View,
  StyleSheet
} from "react-native";
import RegisterLocal from '../../containers/RegisterLocal';


class FavoritesScreen extends Component {

  render() {
    const { state } = this.props.navigation;
    var token = state.params ? state.params.token : undefined;
    alert(token)
      return (
          <View style={styles.container}>
          </View>
      );
  }
}

export default FavoritesScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
  }

});
