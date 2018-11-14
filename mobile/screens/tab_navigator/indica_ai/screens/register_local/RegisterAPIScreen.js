import React, { Component } from "react";
import {
  View,
  StyleSheet
} from "react-native";
import RegisterLocalAPI from '../../containers/RegisterLocalAPI.js';
import { withNavigation,createStackNavigator } from 'react-navigation';


class RegisterAPIScreen extends Component {
constructor(props){
  super(props);
  this.state = {
    //taking data from the page LocalDetails through navigation!!
    latitude: this.props.navigation.state.params.latitude,
    longitude: this.props.navigation.state.params.longitude,
    address: this.props.navigation.state.params.address
  }
}
  render() {
      return (
          <View style={styles.container}>
              <RegisterLocalAPI
                latitude = {this.state.latitude}
                longitude = {this.state.longitude}
                address = {this.state.address}
              />
          </View>
      );
  }
}

export default RegisterAPIScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
  }

});
