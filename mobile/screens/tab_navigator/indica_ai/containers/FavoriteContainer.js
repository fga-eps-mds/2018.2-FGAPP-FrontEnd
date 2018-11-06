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
  render(){
    return(
      <View>
        <FavoriteIcon/>
      </View>
    )
  }
}
