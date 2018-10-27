import { Platform } from 'react-native';
import React, { Component } from "react";
import { Container, Text, Title, Button, Left, Right, Body, Icon, Content, Header, Footer, View } from 'native-base';
import { Constants, Location, Permissions } from 'expo';
import {
  StyleSheet,
} from "react-native";
import { Dimensions } from "react-native";
import UserLocationMap from "../components/UserLocationMap";
import Expo from "expo";

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
         console.log('-----------------------------------------')
          console.log(jsonResponse);
          console.log('-----------------------------------------')
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
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <Container style = {styles.container}>
        <Text style = {styles.titleName}>Cadastrar</Text>
        <Content scrollEnabled={false}>
          <View style={styles.localMap} elevation={5}>
          <UserLocationMap
            latitude = {lat}
            longitude = {long}
            markLat = {markLat}
            markLong = {markLong}
            name = {name}
          />
          </View>
        </Content>
        <Footer>
          <Button style = {styles.buttonStyle}>
            <Text>Confirmar</Text>
          </Button>
        </Footer>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    position:"absolute",
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleName : {
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
  buttonStyle:{
    backgroundColor:"#0AACCC",
  }
});
