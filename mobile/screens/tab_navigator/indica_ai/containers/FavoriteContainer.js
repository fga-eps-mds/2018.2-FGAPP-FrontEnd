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
    this.props.favMessageView(fav)
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
