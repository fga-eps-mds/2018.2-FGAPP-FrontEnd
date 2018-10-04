import {
  Container, Header, Body,
  Content, Button, Icon,
  Card, CardItem, Text,
  Thumbnail, Left, Right,
} from "native-base";

import React, { Component } from "react";
import { View, StyleSheet, ScrollView, } from "react-native";
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

  state = {
    loading: true,
    roles: [],
  };

  _refreshFunc(){
    fetch('http://209.97.153.172:8002/events/')
    .then(res => res.json())
    .then(roles =>{
      this.setState({ loading: false, roles })
      })
    .catch((error) => {
      this.setState({
        loading: false
      });
      console.error(error);
    });
  }

  componentDidMount() {
   this._refreshFunc()
  }

  render() {

    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <View>

        <ScrollView style={styles.scroll}>
          <Button
            rounded 
            full 
            success 
            iconLeft 
            onPress={()=>this._refreshFunc()} 
            style={{marginBottom: 15}}
          >
            <Icon name="refresh"/>
            <Text>Recarregar Eventos</Text>
          </Button>
          {
            this.state.roles.map((role,index) => <FeedItem key={index} imgRole={role.photo} nomeRole={role.event_name} org={role.owner} />)
          }
        </ScrollView>
      </View> 

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