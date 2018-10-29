import { Platform } from 'react-native';
import React, { Component } from "react";
import {Button, Text } from 'native-base';
import { Constants, Location, Permissions } from 'expo';
import {
  View,
  StyleSheet,
  Image,
  ScrollView
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Dimensions } from "react-native";
import UserLocationMap from "../components/UserLocationMap";
import Expo from "expo";
import LocalDetails from "../components/LocalDetails"

export default class App extends Component{


constructor(props){
  super(props);
  this.state = {
    loading: true,
    latitude: null,
    longitude: null,
    error: null,
   jsonResponse: null,
   jsonDetails: null,
   jsonListDetails: null
 };
}
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });
  }

  componentDidMount(){
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
          this._getDataAsync();
      },
      (error) => this.setState({error: error.message}),
      {enableHighAccuracy: true, timeout: 0, maximumAge: 1000, distanceFilter: 3},
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

    _getDataAsync = async () => {
      let longitude;
      let latitude;
      if(this.state.latitude && this.state.longitude){
         longitude =  this.state.longitude;
         latitude =   this.state.latitude;
      }

     try{
       const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+String(latitude)+','+String(longitude)+'&key=AIzaSyBM9WYVio--JddgNX3TTF6flEhubkpjJYc');
       if(response.ok){
         const jsonResponse = await response.json();
         this.setState({ jsonResponse });
         this._getDetailsAsync();
         this.setState({jsonListDetails: []});
         jsonResponse['results'].forEach(result => {
           this._getListDetailsAsync(result["place_id"]);
         })
       }
       throw new Error('Request failed!');
     }catch(Error){
       console.log(Error);
     }
   };

   _getNewDataAsync = async (latitude, longitude) => {
    try{
      const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+String(latitude)+','+String(longitude)+'&key=AIzaSyBM9WYVio--JddgNX3TTF6flEhubkpjJYc');
      if(response.ok){
        const jsonResponse = await response.json();
        this.setState({ jsonResponse });
        this._getDetailsAsync();
        this.setState({jsonListDetails: []});
        jsonResponse['results'].forEach(result => {
          this._getListDetailsAsync(result["place_id"]);
        })
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
   _getListDetailsAsync = async (place_id) => {
    try{
      const response = await fetch('https://maps.googleapis.com/maps/api/place/details/json?placeid='+place_id+'&fields=opening_hours,formatted_address,name,rating,formatted_phone_number&key=AIzaSyBM9WYVio--JddgNX3TTF6flEhubkpjJYc')
      if(response.ok){
        const jsonDetails = await response.json();
        this.setState({jsonListDetails: [...this.state.jsonListDetails, jsonDetails]});

      }
      throw new Error('Request failed!');
    } catch(Error){
      console.log(Error);
    }
  };
   takeNewCoords = (newLatitude, newLongitude) => {
     this._getNewDataAsync(newLatitude,newLongitude);
   }

  render() {
    console.log("__________________________________________________ Lista de detalhes     __________________________________________________________");
    console.log(this.state.jsonListDetails);
    console.log("__________________________________________________ Lista de detalhes     __________________________________________________________");

    let lat;
    let long;

    if(this.state.latitude && this.state.longitude){
      lat = this.state.latitude;
      long = this.state.longitude;
    }
    let markLat = 0;
    let markLong = 0;

    if(this.state.latitude && this.state.longitude){
      markLat = this.state.latitude;
      markLong = this.state.longitude;
    }
    let name;
    if(this.state.jsonDetails){
      name = this.state.jsonDetails['result']['name'];
    }
    let adress;
    if(this.state.jsonDetails){
      adress = this.state.jsonDetails['result']['formatted_address'];
    }

    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <View style = {styles.container}>
        <UserLocationMap
          latitude = {lat}
          longitude = {long}
          markLat = {markLat}
          markLong = {markLong}
          sendNewCoods = {this.takeNewCoords}
         />
      <LocalDetails
      name = {name}
      adress = {adress}
      />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position:"absolute",
    backgroundColor: "white",
    top:0,
    bottom:0,
    left:0,
    right:0
  }
});
