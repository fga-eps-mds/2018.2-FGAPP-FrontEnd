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

class ListFavorites extends Component {
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

const mapStateToProps = store => ({})

const mapDispatchToProps = dispatch => (
  bindActionCreators({}, dispatch)
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