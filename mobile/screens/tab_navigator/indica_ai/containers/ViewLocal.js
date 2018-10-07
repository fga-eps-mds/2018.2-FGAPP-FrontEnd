import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image
} from "react-native";
import LocalMap from "../components/LocalMap.js";

export default class App extends Component{
  render() {
    return (
        <View style={styles.container}>
          <Image style={{height: 230, width: 360}}
            source={require('../assets/fga.jpg')}
          />
          <View style={styles.info}>
            <Text>FGA</Text>
            <View style={styles.localMap}>
              <LocalMap/>
            </View>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position:"absolute",
    top:0,
    bottom:0,
    left:0,
    right:0
  },
  info:{
    position: 'absolute',
    top: 230,
    padding: 10,
  },
  localMap:{
    height: 180,
    width: 340
  }
});
