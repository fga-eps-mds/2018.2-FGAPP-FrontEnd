import React from 'react';
import { StyleSheet, View} from 'react-native';
import getDirections from 'react-native-google-maps-directions'
import { Container, Header, Content, Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';

export default class gmapsDirections extends React.Component {

  handleGetDirections = () => {
    const data = {
      destination: {
        latitude: this.props.latitude,
        longitude: this.props.longitude
      },
      params: [
        {
          key: "travelmode",
          value: "driving"        // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate"       // this instantly initializes navigation using the given travel mode
        }
      ]
    }

    getDirections(data)
  }

  render() {
    return (
      <View>
      <Button style ={{padding: 10}} bordered info onPress={this.handleGetDirections}>
      <Icon
        name='direction'
        color='#0AACCC'
        size={25}
      />
      <Text style = {{color: "#0AACCC"}}>Rota</Text>
      </Button>
      </View>
    );
  }
}
