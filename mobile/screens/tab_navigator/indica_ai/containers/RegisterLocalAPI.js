import React, { Component } from "react";
import {
  Text,
  ScrollView
} from "react-native";
import { withNavigation,createStackNavigator } from 'react-navigation';
import RegisterAPIForm from '../components/RegisterAPIForm.js'

export default class RegisterLocalAPI extends Component{

 _postForm  = async (name,description) => {
       console.log("DESCRIÇÃO NO POST: " + description);
       console.log("NAME NO POST: "+name);
       const url  = "https://dev-indicaai.herokuapp.com/locals/";
       const jsonTest = JSON.stringify({
               name: "LOCAL TEST",
               category_id: 1,
               latitude: 10.00000000,
               longitude: 10.00000000,
               description: "empty",
               address: "rua zzzz quadra zzzz"
             });

          fetch(url, {
                   method: 'POST',
                   headers: {
                     Accept: 'application/json',
                     'Content-Type': 'application/json',
                   },
                   body: jsonTest,
                 })
         .then((response) => response.json())
         .then((responseJson) => {
            return responseJson.status
          })
         .catch((error) => {
            console.error(error);
          });

      }

  takeDataFromTheForm = (name, description) => {
    return this._postForm (name, description);
  }

  render() {
    return (
      <RegisterAPIForm
      sendDataToTheForm = {this.takeDataFromTheForm}
      />
    );
  }
}
