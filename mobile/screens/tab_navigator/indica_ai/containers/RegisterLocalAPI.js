import React, { Component } from "react";
import {
  Text,
  ScrollView
} from "react-native";
import { withNavigation,createStackNavigator } from 'react-navigation';
import RegisterAPIForm from '../components/RegisterAPIForm.js'

export default class RegisterLocalAPI extends Component{

  constructor(props){
    super(props);
    this.state = {
      requestStatus: false
   };
  }

 _postForm  = async (name,description) => {
       console.log("DESCRIÇÃO NO POST: " + description);
       console.log("NAME NO POST: "+name);
       const url  = "https://dev-indicaai.herokuapp.com/locals/";
       const jsonTest = JSON.stringify({
               name: name,
               category_id: 1,
               latitude: 10.00000000,
               longitude: 10.00000000,
               description: description,
               address: "rua zzzz quadra zzzz"
             });
          try{
         const response = await fetch(url, {
                   method: 'POST',
                   headers: {
                     Accept: 'application/json',
                     'Content-Type': 'application/json',
                   },
                   body: jsonTest,
                 })
          const jsonResponse = await response.json()
           console.log(jsonResponse);
           if(jsonResponse['status'] === "SUCCESS"){
              this.setState({requestStatus: true})
            }
         }catch(error){
            console.error(error);
          }
      }

  takeDataFromTheForm = (name, description) => {
     this._postForm (name, description);

  }

  render() {
    console.log("================== STATUS NO REQUEST ===================");
    console.log(this.state.requestStatus);
    return (
      <RegisterAPIForm
      sendDataToTheForm = {this.takeDataFromTheForm}
      requestStatus = {this.state.requestStatus}
      />
    );
  }
}
