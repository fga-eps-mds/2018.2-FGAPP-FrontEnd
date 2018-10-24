import { Platform } from 'react-native';
import React, { Component } from "react";
import { Constants, Location, Permissions } from 'expo';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Dimensions } from "react-native";
import UserLocationMap from "../components/UserLocationMap";

export default class App extends Component{

  state = {
   location: null,
   errorMessage: null,
   jsonResponse: null,
   jsonDetails: null,
 };

 componentWillMount() {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        this.setState({
          errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
        });
      } else {
        this._getLocationAsync();
      }
    }

    _getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
      }

      let location = await Location.getCurrentPositionAsync({});
      this.setState({ location });
      this._getDataAsync();

    };

    _getDataAsync = async () => {

     let longitude =  this.state.location['coords']['longitude'];
     let latitude =   this.state.location['coords']['latitude'];
     try{
       const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+String(latitude)+','+String(longitude)+'&key=AIzaSyBM9WYVio--JddgNX3TTF6flEhubkpjJYc');
       if(response.ok){
         const jsonResponse = await response.json();
         this.setState({ jsonResponse });

         this._getDetailsAsync();
       }
       throw new Error('Request failed!');
     }catch(Error){
       console.log(Error);
     }
   };

    _getDetailsAsync = async () => {
      let index =0;
      let i = 0;
      let place_id;
      if(this.state.jsonResponse){
        this.state.jsonResponse['results'].forEach(result => {
          if(result['geometry']['location_type'] === 'ROOFTOP'){
             index = i;
       }
       i++;
        });
        place_id = this.state.jsonResponse['results'][index]['place_id'];
      }
     try{
       const response = await fetch('https://maps.googleapis.com/maps/api/place/details/json?placeid='+place_id+'&fields=opening_hours,formatted_address,name,rating,formatted_phone_number&key=AIzaSyBM9WYVio--JddgNX3TTF6flEhubkpjJYc')
       if(response.ok){
         const jsonDetails = await response.json();
         this.setState({jsonDetails});
       }
       throw new Error('Request failed!');
     } catch(Error){
       console.log(Error);
     }
   };

  render() {

    let longitude;
    let latitude;
    if (this.state.location) {
       longitude = Number(this.state.location['coords']['longitude']);
       latitude = Number(this.state.location['coords']['latitude']);
     }
    let name;
    if(this.state.jsonDetails){
      name = this.state.jsonDetails['result']['name'];
    }
     let markerLatitude =0;
     let markerLongitude =0;

     if(latitude){
      markerLatitude = Number(latitude);
    }
      if(longitude){
       markerLongitude = Number(longitude);
       }
    return (
      <View style = {styles.container}>
      <Text style = {styles.titleName}>Cadastrar</Text>
      <View style={styles.localMap} elevation={5}>
        <UserLocationMap
        markerLatitude = {markerLatitude}
        markerLongitude = {markerLongitude}
        latitude = {latitude}
        longitude = {longitude}
        name = {name}
         />
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position:"absolute",
    backgroundColor: "white",
    top:0,
    bottom:0,
    left:0,
    right:0
  },
  titleName : {
    alignItems: 'center',
    marginLeft: '34%',
    fontSize: 30,
    marginTop: 30,
    color: "#0AACCC",
  },
  localMap:{
    height: 300,
    width: "100%",
    top: 10,
    padding:20,
    backgroundColor:'#d9d9d9',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  }

});
