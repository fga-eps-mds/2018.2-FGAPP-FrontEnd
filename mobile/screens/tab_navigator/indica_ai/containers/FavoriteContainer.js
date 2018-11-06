import React from "react";
import FavoriteIcon from "../components/FavoriteIcon";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView
} from "react-native";

export default class FavoriteContainer extends React.Component {
  favMessageIcon = (fav)=>{
    /*inside this function you'll call requestions to either save a local as a favorite or
    delete it, that's all depends on the fav value (true or false)
    warning: fav = false is set to be the request to save the local,therefore true is to delete it
    */
    this.props.favMessageView(fav) // this funcion has to be called iniside the resquest to show the user that
    //the request went right by the showMessage method
  }
  render(){
    return(
      <View>
        <FavoriteIcon
        favMessageIcon = {this.favMessageIcon}
        />
      </View>
    )
  }
}
