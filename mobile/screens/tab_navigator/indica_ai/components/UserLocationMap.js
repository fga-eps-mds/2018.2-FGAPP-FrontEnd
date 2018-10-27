import React from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import MapView, {Marker} from 'react-native-maps';
import {mapStyle} from '../assets/mapStyle.js';
import icon from '../assets/icon4.png'

export default class UserMap extends React.Component {

  constructor(props){
    super(props);
  };

  render(){
    return(
      <View style = {styles.container}>
      <MapView
        style = {styles.map}
        customMapStyle={mapStyle}
        initialRegion = {{
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          latitudeDelta: 0.0004,
          longitudeDelta: 0.003,
        }}>
        <MapView.Marker
        coordinate={{
              latitude: this.props.markLat,
              longitude:this.props.markLong,}}
              title = {this.props.name}
              image = {icon}
        >
        </MapView.Marker>
        </MapView>
        </View>
      )
    }
}

const styles = StyleSheet.create({
 container: {
     position: 'absolute',
     top: 0,
     left: 0,
     bottom: 0,
     right: 0,
     justifyContent: 'flex-end',
     alignItems: 'center'
 },
 map: {
   width:"100%",
   position: 'absolute',
   top: 0,
   left: 0,
   bottom: 0,
   right: 0
 }
});
