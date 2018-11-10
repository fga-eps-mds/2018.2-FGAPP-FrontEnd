import React, { Component } from "react";
import {
  Text,
  ScrollView,
  Alert
} from "react-native";
import { withNavigation,createStackNavigator } from 'react-navigation';
import RegisterAPIForm from '../components/RegisterAPIForm.js'

class RegisterLocalAPI extends Component{

  constructor(props){
    super(props);
    this.state = {
      requestStatus: null,
      category: [],
      local: {
        name: null,
        description: null,
        id: null
      }
    };
  }

    componentWillMount() {
        const url = fetch(`https://dev-indicaai.herokuapp.com/categories`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "aplication/json"
        }
      })
      .then(response => response.json())
      .then(responseJson => {
        this.state.category = responseJson;
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log(this.state.category);
       })
      .catch(error => {
        console.log(error);
      });
  };

 _postForm  = async (name,description) => {
       const url  = "https://dev-indicaai.herokuapp.com/locals/";
       const jsonTest = JSON.stringify({
               name: name,
               categories: 1,
               latitude: this.props.latitude,
               longitude: this.props.longitude,
               description: description,
               address: this.props.adress
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
              this.setState({requestStatus: "SUCCESS"})
              this.setState({
                local: {
                  name: name,
                  description: description,
                  id: jsonResponse["data"][0]["id"]
                }
              })
            }else{
              this.setState({requestStatus: "FAILED"})
            }
         }catch(error){
            console.error(error);
          }
      }

  takeDataFromTheForm = (name, description) => {
     this._postForm (name, description);
  }

  render() {
    if(this.state.requestStatus === "SUCCESS"){
      Alert.alert(
                  'Local cadastrado com sucesso!',
                  "",
                  [
                    {text: 'OK', onPress : ()=> this.props.navigation.navigate('LocalDetails',{
                      local: this.state.local})}
                  ],
                  { cancelable: false }
                )

      }else if (this.state.requestStatus === "FAILED"){
        Alert.alert(
                    'Ooops!',
                    "Houve um erro ao cadastrar esse local, tente novamente mais tarde",
                    [
                      {text: 'OK', onPress : () => this.props.navigation.navigate("Register")}
                    ],
                    { cancelable: false }
                  )
      }
    return (
      <RegisterAPIForm
      sendDataToTheForm = {this.takeDataFromTheForm}
      />
    );
  }
}
export default withNavigation(RegisterLocalAPI);
