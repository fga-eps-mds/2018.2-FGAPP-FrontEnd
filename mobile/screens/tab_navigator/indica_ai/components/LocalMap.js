import React, { Component}   from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import MapView from "react-native-maps"

export default class LocalMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name ? props.name : 'Sem Nome',
      description: props.description ? props.description: '',
      latitude: props.latitude ? props.latitude : 0.00000000,
      longitude: props.longitude ? props.longitude: 0.00000000,
    };
  }
  render() {
    return(
      <View style = {styles.container}>
        <MapView style = {styles.map}
          region = {{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.007,
            longitudeDelta: 0.007,
          }}
        >
        <MapView.Marker
          coordinate = {{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
          }}
          title = {this.state.name}
          description = {this.state.description}
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
