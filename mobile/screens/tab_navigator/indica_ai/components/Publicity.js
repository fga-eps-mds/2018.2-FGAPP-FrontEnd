import React, { Component}   from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Row } from 'native-base';

export default class Publicity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onPress: props.onPress,
    }
  }

  render() {

  const name = this.props.name;
  const address = this.props.address;
  const rating = this.props.rating;
  const image  = (this.props.image.length !== 0) ?
    {uri: "data:image/jpg;base64," + this.props.image[this.props.image.length - 1]["image"]}
    :require('../assets/IntegraApps_icon.png')

    return (
      <TouchableOpacity onPress={() => this.state.onPress()}>
        <Card>
          <CardItem cardBody style={{paddingHorizontal: 5, paddingTop: 5}}>
            <ImageBackground source={image} style={{height: 200, width: null, flex: 1}}>
            </ImageBackground>
          </CardItem>
          <CardItem>
            <Left>
              <Thumbnail source={require('../assets/fga-logo.png')} />
              <Body>
                <Text style={styles.localName}>{name}</Text>
                <Text note>{address}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Right>
              <Text style={styles.localAnuncio}>Anúncio</Text>
            </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({

  localAnuncio: {
    color: '#0AACCC',
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#0AACCC',
    borderRadius: 2
  },
  localName: {
    fontWeight: 'bold',
    fontSize: 20
  }

});
