import React from "react";
import FavoriteIcon from "../components/FavoriteIcon";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView
} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import jwt_decode from 'jwt-decode';

class FavoriteContainer extends React.Component {

  saveFav = async(user_id, local_id) => {
    const url = `${process.env.INDICA_AI_API}/favorites/`;
    try{
      const response = await fetch(url ,{
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_identifier: user_id,
          local_id: local_id

        })
      })
      const responseJson = await response.json();
      if(responseJson['status']==="SUCCESS"){
        this.props.favMessageView(false)
      }
      console.log("responseJson");
      console.log(responseJson);
    }catch(error){
      console.log(errors)
    }
  }
  favMessageIcon = (fav)=>{
    const token = this.props.token
    const local_id = this.props.id
    const user = jwt_decode(token)

    if(!fav){
      this.saveFav(user.user_id, local_id)
    }
     // this funcion has to be called iniside the resquest to show the user that
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
const mapStateToProps = store => ({
    token: store.authReducer.token
})
export default connect(mapStateToProps,
  null)(FavoriteContainer);
