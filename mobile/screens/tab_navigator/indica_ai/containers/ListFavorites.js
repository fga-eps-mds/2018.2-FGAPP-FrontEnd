import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  ImageBackground,
} from "react-native";
import {
  Content,
  Card,
  CardItem,
  Text,
  Label,
  Icon,
  Container
} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNavigation } from 'react-navigation';
import FavoriteCard from '../components/FavoriteCard';
import jwt_decode from 'jwt-decode';
import {favoriteAction} from "../actions"

class ListFavorites extends Component {


  componentDidMount(){
    this.fetchFavoritesList();
  }


  fetchFavoritesList = async() => {
    const {token} = this.props
    const user = jwt_decode(token)
    const url = `${process.env.INDICA_AI_API}/users/${user.user_id}/favorites/`
    
    try{
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "aplication/json"
        }
      })
      const responseJSON = await response.json();

      if(responseJSON['status'] === "SUCCESS"){
        this.props.favoriteAction(responseJSON);
      }

    }catch(error){
      console.log(error)
    }
  }
  render() {
    return (
      <ScrollView style={styles.Container}>
        <FavoriteCard />
        <FavoriteCard />
        <FavoriteCard />
        <FavoriteCard />
        <FavoriteCard />
        <FavoriteCard />
        <FavoriteCard />
        <FavoriteCard />
        <FavoriteCard />
        <FavoriteCard />
        <FavoriteCard />
        <FavoriteCard />
      </ScrollView>

    );
  }
}

const mapStateToProps = store => ({
  favorites: store.favoriteReducer.favorites
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({favoriteAction}, dispatch)
)

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(ListFavorites));


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%"
  },
});