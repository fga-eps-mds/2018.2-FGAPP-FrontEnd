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

import { Dimensions } from "react-native";
import UserLocationMap from "../components/UserLocationMap";
import Expo from "expo";
import LocalDetails from "../components/LocalDetails"

class RegisterLocal extends Component{

constructor(props){
  super(props);
  this.state = {
    loading: true,
    latitude: null,
    longitude: null,
    error: null,
   jsonResponse: null,
   jsonDetails: null,
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
       const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='
                            + String(latitude) + ',' + String(longitude)
                            + '&key=AIzaSyBM9WYVio--JddgNX3TTF6flEhubkpjJYc');
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

   _getNewDataAsync = async (latitude, longitude) => {
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
       const response = await fetch('https://maps.googleapis.com/maps/api/place/details/json?placeid='+
                                    place_id+
                                    '&fields=opening_hours,formatted_address,name,rating,formatted_phone_number,photo,rating,geometry&key=AIzaSyBM9WYVio--JddgNX3TTF6flEhubkpjJYc')
       if(response.ok){
         const jsonDetails = await response.json();
         this.setState({jsonDetails});
          let name = jsonDetails['result']['name']
          let address = jsonDetails['result']['formatted_address']
          var obj = {name, address}
          console.log(JSON.stringify(obj));
          jsonDetails['result']['formatted_phone_number']
          jsonDetails['result']['formatted_address']
          jsonDetails['result']['rating']
          jsonDetails['result']['geometry']['location']['lat']
          jsonDetails['result']['geometry']['location']['lng']
          jsonDetails['result']['photos'][0]['photo_reference']
          jsonDetails['result']['opening_hours']['periods'][0]['close']['time']
          jsonDetails['result']['opening_hours']['periods'][0]['open']['time']
          jsonDetails['result']['opening_hours']['periods'][1]['close']['time']
          jsonDetails['result']['opening_hours']['periods'][1]['open']['time']
          jsonDetails['result']['opening_hours']['periods'][2]['close']['time']
          jsonDetails['result']['opening_hours']['periods'][2]['open']['time']
          jsonDetails['result']['opening_hours']['periods'][3]['close']['time']
          jsonDetails['result']['opening_hours']['periods'][3]['open']['time']
          jsonDetails['result']['opening_hours']['periods'][4]['close']['time']
          jsonDetails['result']['opening_hours']['periods'][4]['open']['time']
          jsonDetails['result']['opening_hours']['periods'][5]['close']['time']
          jsonDetails['result']['opening_hours']['periods'][5]['open']['time']
          jsonDetails['result']['opening_hours']['periods'][6]['close']['time']
          jsonDetails['result']['opening_hours']['periods'][6]['open']['time']

       }
       throw new Error('Request failed!');
     } catch(Error){
       console.log(Error);
     }
   };
   takeNewCoords = (newLatitude, newLongitude) => {
     this._getNewDataAsync(newLatitude,newLongitude);
   }

   sendData = data => {
     fetch(`https://indicaai.herokuapp.com/locals`, {
       method: 'POST',
       body: JSON.stringify(data),
       headers: {
         'Content-Type': 'aplication/json'
       }
     })
   };

  render() {

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

export default RegisterLocal;

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
  },
});
