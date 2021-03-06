import React from 'react';
import {
    Platform,
    Text,
    View,
    StyleSheet,
    Dimensions
} from 'react-native'
import {
    Constants,
    Location,
    Permissions,
    MapView,
    Marker
} from 'expo'
import {mapStyle} from '../assets/mapStyle.js'
import icon from '../assets/icon4.png'
import RegisterLocal from '../containers/RegisterLocal'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height / 2;

export default class UserMap extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      newLatitude: null,
      newLongitude: null,
      markLatitude: this.props.markLat,
      markLongitude: this.props.markLong
    }
  };

  render(){
    return(
      <View style = {styles.container}  elevation={5}>
      <MapView
        style = {styles.map}
        customMapStyle={mapStyle}
        initialRegion = {{
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          latitudeDelta: 0.0004,
          longitudeDelta: 0.003,
        }}
        onRegionChangeComplete = {(event) =>{
          this.props.sendNewCoods(event['latitude'],event['longitude'])
          this.setState({
            newLatitude: event['latitude'],
            newLongitude: event['longitude']
          })}}
          onRegionChange = {(event) => {
            this.setState({
              markLatitude: event['latitude'],
              markLongitude: event['longitude']
            })
          }}
        >
        <MapView.Marker
        coordinate={{
              latitude: this.state.markLatitude,
              longitude:this.state.markLongitude,}}
              title = {this.props.name}
              image = {icon}
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
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor:'#d9d9d9',
     shadowColor: "#000000",
     shadowOpacity: 0.8,
     shadowRadius: 2,
     shadowOffset: {
       height: 1,
       width: 1
     },
     width,
     height: "60%",
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
