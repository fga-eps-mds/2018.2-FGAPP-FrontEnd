import { Platform } from 'react-native';
import React, { Component } from "react";
import { Button, Text } from 'native-base';
import { Constants, Location, Permissions } from 'expo';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";

import { Dimensions } from "react-native";
import UserLocationMap from "../components/UserLocationMap";
import Expo from "expo";
import LocalDetails from "../components/LocalDetails";
import SuccessModal from '../components/SuccessModal';
import ErrorModal from '../components/ErrorModal';
import { withNavigation, createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchAction } from '../actions'

class RegisterLocal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      latitude: null,
      longitude: null,
      error: null,
      jsonResponse: null,
      jsonDetails: null,
      opening_hours: [],
      local: {},
      successModalVisible: false,
      errorModalVisible: false,
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

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        this._getDataAsync();
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 0, maximumAge: 1000, distanceFilter: 3 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  _getDataAsync = async () => {
    let longitude;
    let latitude;
    if (this.state.latitude && this.state.longitude) {
      longitude = this.state.longitude;
      latitude = this.state.latitude;
    }

    try {
      const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='
        + String(latitude) + ',' + String(longitude)
        + '&key=AIzaSyBM9WYVio--JddgNX3TTF6flEhubkpjJYc');
      if (response.ok) {
        const jsonResponse = await response.json();
        this.setState({ jsonResponse });
        this._getDetailsAsync();

      }
      throw new Error('Request failed!');
    } catch (Error) {
      console.log(Error);
    }
  };

  _getNewDataAsync = async (latitude, longitude) => {
    try {
      const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + String(latitude) + ',' + String(longitude) + '&key=AIzaSyBM9WYVio--JddgNX3TTF6flEhubkpjJYc');
      if (response.ok) {
        const jsonResponse = await response.json();
        this.setState({ jsonResponse });
        this._getDetailsAsync();
      }
      throw new Error('Request failed!');
    } catch (Error) {
      console.log(Error);
    }
  };


  _getDetailsAsync = async () => {
    let index = 0;
    let i = 0;
    let place_id;
    if (this.state.jsonResponse) {
      this.state.jsonResponse['results'].forEach(result => {
        if (result['geometry']['location_type'] === 'ROOFTOP') {
          index = i;
        }
        i++;
      });
      place_id = this.state.jsonResponse['results'][index]['place_id'];
    }
     try{
       const response = await fetch('https://maps.googleapis.com/maps/api/place/details/json?placeid='+
                                    place_id+
                                    '&fields=opening_hours,formatted_address,name,rating,formatted_phone_number,'
                                     +'photo,rating,geometry,reviews&key=AIzaSyBM9WYVio--JddgNX3TTF6flEhubkpjJYc')
       if(response.ok){
         const jsonDetails = await response.json();
         this.setState({jsonDetails});
         let obj=[];
         for(let i=0; i<7; i++){
           if(jsonDetails['result']['opening_hours']['periods'][i]){
             day = i+1;
             this.setState({day});
             hourO = jsonDetails['result']['opening_hours']['periods'][i]['open']['time'];
             sep=':'
             open = [hourO.slice(0,2), sep, hourO.slice(2)]
             opens = open[0].concat(sep, open[2])
             this.setState({opens});
             hourC = jsonDetails['result']['opening_hours']['periods'][i]['close']['time'];
             close = [hourC.slice(0,2), sep, hourC.slice(2)]
             closes = close[0].concat(sep, close[2])
             this.setState({closes});
             obj = {day, opens, closes};
             this.state.opening_hours = [ ...this.state.opening_hours, obj];
           }
         }
         this.state.opening_hours = []
       }
       throw new Error('Request failed!');
     } catch(Error){
       console.log(Error);
     }
   };
   takeNewCoords = (newLatitude, newLongitude) => {
     this._getNewDataAsync(newLatitude,newLongitude);
     this.setState({latitude: newLatitude, longitude: newLongitude});
   }

   sendData = async (data) => {
     try{
       const response = await fetch(`${process.env.INDICA_AI_API}/locals/`, {
         method: 'POST',
         headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
       })
       if(response.ok){
         const jsonResponse = await response.json();
         this.setState({ successModalVisible: true })
         this.setState({
           local: jsonResponse.data[0]
         })
         this._updateFunction();
       }
     }
     catch(error){
       this.setState({ errorModalVisible: true })
     }
   };
   _updateFunction = () => {
    fetch(`${process.env.INDICA_AI_API}/locals/`, {
     method: "GET",
     headers: {
       Accept: "application/json",
       "Content-Type": "aplication/json"
     }
   })
   .then(response => response.json())
   .then(responseJson => {
     this.props.searchAction(responseJson)
   })
   .catch(error => {
     console.log(error);
   });

 }
   afterRegister() {
     const { local } = this.state
     this.setState({ successModalVisible: false });
     this.props.navigation.navigate('LocalDetails', {local});
   }

  render() {

    let latitude;
    let longitude;

    if (this.state.latitude && this.state.longitude) {
      latitude = this.state.latitude;
      longitude = this.state.longitude;
    }
    let markLat = 0;
    let markLong = 0;

    if (this.state.latitude && this.state.longitude) {
      markLat = this.state.latitude;
      markLong = this.state.longitude;
    }
    let name;
    if (this.state.jsonDetails) {
      name = this.state.jsonDetails['result']['name'];
    }
    let address;
    if (this.state.jsonDetails) {
      address = this.state.jsonDetails['result']['formatted_address'];
    }
    let telephone;
    let rating;
    if (this.state.jsonDetails) {
      telephone = this.state.jsonDetails['result']['formatted_phone_number']
      rating = this.state.jsonDetails['result']['rating']
    }

    let opening_hours = [];
    opening_hours = this.state.opening_hours;

    const data = { name, address, telephone, latitude, longitude, opening_hours }

    if (this.state.loading) {
      return <Expo.AppLoading />;
    }

    return (
      <View style={styles.container}>
        <UserLocationMap
          latitude = {latitude}
          longitude = {longitude}
          markLat = {markLat}
          markLong = {markLong}
          sendNewCoods = {this.takeNewCoords}
         />
         <LocalDetails
           data = {data}
           sendData = {this.sendData}
           name = {name}
           address = {address}
           latitude = {this.state.latitude}
           longitude = {this.state.longitude}
        />
        <SuccessModal
          onCancel={() => this.afterRegister()}
          visible={this.state.successModalVisible}
          message={"Local cadastrado com sucesso"}
        />
        <ErrorModal
          onCancel={() => this.setState({ errorModalVisible: false })}
          visible={this.state.errorModalVisible}
          message={"Erro ao cadastrar o local"}
        />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({ searchAction }, dispatch)
)
export default withNavigation(connect(
  null,
  mapDispatchToProps
)(RegisterLocal));

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  titleName: {
    alignItems: 'center',
    marginLeft: '34%',
    fontSize: 30,
    marginTop: 30,
    color: "#0AACCC",
  },
  localMap:{
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
});
