import React, { Component } from "react";
import {
  View,
  StyleSheet
} from "react-native";
import ViewLocal from '../../containers/ViewLocal';


class FavoriteDetailsScreen extends Component {
  
  render() {
      return (
          <View style={styles.container}>
              <ViewLocal />
          </View>
      );
  }
}

export default FavoriteDetailsScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
  }

});
