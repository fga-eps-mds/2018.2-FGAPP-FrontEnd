import React, { Component } from "react";
import {
  Text,
  ScrollView
} from "react-native";
import RegisterAPIForm from '../components/RegisterAPIForm.js'

export default class RegisterLocalAPI extends Component{

 _postForm  = async (jsonForm) => {
  try{
    const response = await fetch('#', {method: 'POST', body: JSON.stringify(jsonForm)});
  	if(response.ok){
      const jsonResponse = await response.json();
      return jsonResponse;
    }
    throw new Error('Request failed!');
  }catch(error){
    console.log(error);
  }
}

  takeDataFromTheForm = (JsonForm) => {
    this._postForm (JsonForm);
  }

  render() {
    return (
      <RegisterAPIForm
      sendDateFromTheForm = {this.takeDataFromTheForm}
      />
    );
  }

}
