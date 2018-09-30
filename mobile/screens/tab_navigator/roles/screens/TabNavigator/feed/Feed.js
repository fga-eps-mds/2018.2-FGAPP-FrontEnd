import {
  Container, Header, Body,
  Content, Button, Icon,
  Card, CardItem, Text,
  Thumbnail, Left, Right,
} from "native-base";

import React, { Component } from "react";
import { StyleSheet, ScrollView } from "react-native";
import FeedItem from "./FeedItem";
class Feed extends Component {
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });
  }

  constructor(props) {
    super(props);
    this.state = { loading: true, roles: [] };
  }

  componentDidMount() {
    fetch('https://raulvictor.pythonanywhere.com/events/?format=json')
      .then(res => res.json())
      .then(roles => this.setState({ loading: false, roles }))
      .catch((error) => {
        this.setState({
          loading: false
        });
        console.error(error);
      });
  }

  render() {

    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      //adicionar dados API_REST para consumir... somente event_name consumido
      <ScrollView style={styles.scroll}>
        {
          this.state.roles.map(role => <FeedItem nomeRole={role.event_name} />)
        }
      </ScrollView>

    );
  }//end render ()
}//end class

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  mb: {
    marginBottom: 15
  }
});

export default Feed;