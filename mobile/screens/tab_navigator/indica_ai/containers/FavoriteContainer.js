import React from "react";
import FavoriteIcon from "../components/FavoriteIcon";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert
} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import jwt_decode from 'jwt-decode';
import ErrorModal from "../components/ErrorModal"
import { favoriteAction } from "../actions"

class FavoriteContainer extends React.Component {


  state  = {
    errorModalVisible: false,
    token: this.props.token,
    local_id: this.props.id,
    favorites: this.props.favorites
  }
  componentWillReceiveProps(newProps){
    if(newProps.favorites){
      this.setState({favorites: newProps.favorites})
    }
  }
  _updateFunction = async () => {
    const {token} = this.state
    const user = jwt_decode(token)
    const url = `${process.env.INDICA_AI_API}/users/${user.user_id}/favorites/`

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "aplication/json"
        }
      })
      const responseJSON = await response.json();
      if (response.ok) {
        this.props.favoriteAction(responseJSON["favorites"]);
      }

    } catch (error) {
      console.log(error)
    }
  }

  _saveFav = async() => {
    const {local_id, token} = this.state
    const user = jwt_decode(token)
    const url = `${process.env.INDICA_AI_API}/favorites/`;
    try{
      const response = await fetch(url ,{
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_identifier: user.user_id,
          local_id: local_id

          })
      })
      if(response.ok){
        this.props.favMessageView(false)
        this._updateFunction();
      }else{
        this.setState({errorModalVisible: true})
      }
      }catch(error){
        console.log(errors)
    }
  }

  _deleteFav = async() => {
    const {favorites, local_id} = this.state
    let favorite_id;
    favorites.forEach(favorite => {
      if(favorite.local_id === local_id){
        favorite_id = favorite.id
      }
    })
    if(favorite_id){
      const url = `${process.env.INDICA_AI_API}/favorites/${favorite_id}`
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "aplication/json"
        }
      })
      if(response.ok){
        this.props.favMessageView(true)
        this._updateFunction()
      }else{
        this.setState({errorModalVisible: true})
      }
    }
  }

  favMessageIcon = (fav)=>{
    if(!fav){
      this._saveFav()
    }else{
      this._deleteFav()
    }
  }
  render(){
    console.log("FAVS")
    console.log(this.props.favorites)
    const {favorites, local_id} = this.state
    return(
      <View>
        <FavoriteIcon
        favMessageIcon = {this.favMessageIcon}
        liked = {favorites.some(favorite => favorite.local_id === local_id)}
        />
        <ErrorModal
        onCancel={() => this.setState({ errorModalVisible: false })}
        visible={this.state.errorModalVisible}
        message="Ocorreu um erro"
      />
      </View>
    )
  }
}
const mapStateToProps = store => ({
    token: store.authReducer.token,
    favorites: store.favoriteReducer.favorites
})
const mapDispatchToProps = dispatch => (
  bindActionCreators({ favoriteAction }, dispatch)
)
export default connect(mapStateToProps,
  mapDispatchToProps)(FavoriteContainer);
