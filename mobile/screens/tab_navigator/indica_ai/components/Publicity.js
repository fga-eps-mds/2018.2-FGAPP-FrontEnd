import React, { Component}   from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Row } from 'native-base';

export default class Publicity extends Component {
  render() {
    return (
      <TouchableOpacity>
        <Card style={{marginLeft: 5, marginRight: 5}}>
          <CardItem cardBody style={{paddingHorizontal: 5, paddingTop: 5}}>
            <ImageBackground source={require('../assets/fga.jpg')} style={{height: 200, width: null, flex: 1}}>
            </ImageBackground>
          </CardItem>
          <CardItem>
            <Left>
              <Thumbnail source={require('../assets/fga-logo.png')} />
              <Body>
                <Text style={styles.localName}>Faculdade do Gama [FGA]</Text>
                <Text note>St. Leste Projeção A - Gama Leste, Brasília - DF, 72444-240</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Left>
              <Row>
                <Icon
                  style={styles.iconRating}
                  active
                  name="star"
                />
                <Text>3.0</Text>
              </Row>
            </Left>
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
  },
  iconRating: {
    bottom: 3,
    left: 5,
    alignContent: 'space-around'
  }

});
