import React from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native'
import { Constants, Location, Permissions } from 'expo'
import MapView, {Marker} from 'react-native-maps'
import {mapStyle} from '../assets/mapStyle.js'
import icon from '../assets/icon4.png'
import RegisterLocal from '../containers/RegisterLocal'

export default class UserLocationMap extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      newLatitude: null,
      newLongitude: null
    }
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
              draggable
              onDragEnd={(event) =>{
                this.props.sendNewCoods(event.nativeEvent.coordinate['latitude'],event.nativeEvent.coordinate['longitude'])
                this.setState({
                  newLatitude: event.nativeEvent.coordinate['latitude'],
                  newLongitude: event.nativeEvent.coordinate['longitude']
                })}}

        >
        <MapView.Callout
          tooltip={true}>
              <View style = {styles.calloutStyle}>
                <Text>
                  Pressione para ajustar o marcador
                </Text>
              </View>
        </MapView.Callout>
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
   position: 'absolute',
   top: 0,
   left: 0,
   bottom: 0,
   right: 0
 },
 calloutStyle: {
   backgroundColor: "rgba(255, 255, 255, 0.8)",
   padding: 10,
   borderRadius: 10
 }
});
