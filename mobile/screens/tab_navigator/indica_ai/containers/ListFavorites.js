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
import { favoriteAction } from "../actions"

class ListFavorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: props ? props.favorites : [],
      locals: props ? props.locals : []
    };
  }

  componentWillMount() {
    //fetch na lista de locais favoritos
    this.fetchFavoritesList();
  }


  fetchFavoritesList = async () => {
    const { token } = this.props
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

  componentWillReceiveProps(newProps) {
    if (newProps.favorites !== undefined) {
      this.setState({ favorites: newProps.favorites })
    }
    if (newProps.locals !== undefined) {
      this.setState({ locals: newProps.locals })
    }
  }

  render() {
    const { favorites } = this.state
    const { locals } = this.state
    // console.log("teste favoritos")
    // console.log(favorites)
    // console.log("locais:")
    // console.log(locals)

    if ((Object.keys(favorites).length === 0)) {
      return (
        <Text>Empty</Text>
      )
    } else {
      return (
        <ScrollView style={styles.Container}>
          {favorites.map(favorite =>
            <View key={favorite.id}>
              <FavoriteCard key={favorite.id} />
            </View>
          )}
        </ScrollView>
      );
    }
  }
}

const mapStateToProps = store => ({
  favorites: store.favoriteReducer.favorites,
  locals: store.searchReducer.locals
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ favoriteAction }, dispatch)
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