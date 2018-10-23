import React from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import MapView, {Marker} from 'react-native-maps';

export default class App extends React.Component {
  render(){
    return(
      <MapView
        style = {{flex: 1}}
        initialRegion = {{
          latitude: -15.989602,
          longitude: -48.044868,
          latitudeDelta: 0.0007,
          longitudeDelta: 0.005,
        }}
        />
      )
    }
}
