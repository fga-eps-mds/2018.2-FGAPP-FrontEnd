import React from 'react';
import { StyleSheet, View} from 'react-native';
import getDirections from 'react-native-google-maps-directions'
import { Container, Header, Content, Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import DirectionModal from '../components/DirectionModal.js'

export default class gmapsDirections extends React.Component {
 state = {
   modalVisible: false
 }
  handleGetDirections = (navigation) => {
    this.setState({modalVisible: false})
    const data = {
      destination: {
        latitude: this.props.latitude,
        longitude: this.props.longitude
      },
      params: [
        {
          key: "travelmode",
          value: navigation       // may be "walking", "bicycling" or "transit" as well
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
      <Button style ={{padding: 10}}  info onPress={()=>this.setState({modalVisible: true})}>
      <Icon
        name='direction'
        color='#fff'
        size={25}
      />
      <Text style = {{color: "#fff"}}>Rota</Text>
      </Button>
      <DirectionModal
      handleGetDirections={this.handleGetDirections}
      onCancel={() => this.setState({ modalVisible: false })}
      visible={this.state.modalVisible}
      />
      </View>
    );
  }
}
