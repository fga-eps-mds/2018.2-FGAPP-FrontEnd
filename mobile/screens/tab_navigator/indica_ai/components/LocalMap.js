import React, { Component}   from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import MapView from "react-native-maps"

export default class Map extends Component {
  render() {
    return(
      <View style = {styles.container}>
        <MapView style = {styles.map}
          region = {{
            latitude: -15.989602,
            longitude: -48.044868,
            latitudeDelta: 0.007,
            longitudeDelta: 0.007,
          }}
        >
        <MapView.Marker
          coordinate = {{
            latitude: -15.989602,
            longitude: -48.044868,
          }}
          title = {'FGA'}
          description = {'Universidade de Brasília - Faculdade do Gama'}
        />
        </MapView>
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
  map: {
    position:"absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
});
