import {
  Container, Header, Body,
  Content, Button, Icon,
  Card, CardItem, Text,
  Thumbnail, Left, Right,
} from "native-base";

import React, { Component } from "react";
import { StyleSheet, Image, ScrollView } from "react-native";
import FeedItem from "./FeedItem";
const logo = require("./images/logo.png");
const cardImage = require("./images/banner.png");

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });
  }
  render() {

    if (this.state.loading) {
      return <Expo.AppLoading />;
    }

    return (

      <ScrollView style={styles.scroll}>
          <Header>
              <Body>
                <Text>Rolê 1 (nome do rolê)</Text>
              </Body>
          </Header>
         <FeedItem> </FeedItem>
         <FeedItem> </FeedItem>
         <FeedItem> </FeedItem>
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