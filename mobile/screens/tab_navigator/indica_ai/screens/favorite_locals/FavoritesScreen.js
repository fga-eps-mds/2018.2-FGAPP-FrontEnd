import React, { Component } from "react";
import {
  View,
  StyleSheet
} from "react-native";
import ListFavorites from '../../containers/ListFavorites';


class FavoritesScreen extends Component {

  render() {
    const { state } = this.props.navigation;
    const token = state.params ? state.params.token : undefined;
    return (
      <View style={styles.container}>
        <ListFavorites 
           token = {token}
        />
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
  }

});
