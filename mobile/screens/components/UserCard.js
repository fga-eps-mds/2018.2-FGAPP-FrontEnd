import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { Container, Header, Content, Card, CardItem, Body, Text, Form, Item , Label, Input } from 'native-base';

export default class UserCard extends Component{
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render(){
  return(
          <Card style={{height:150, paddingRight: 10}}>
            <CardItem style={{height:'100%'}}>
              <Body>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                  <TouchableOpacity onPress={() => this.props.onPress()} style={styles.view_circle}>
                    <View>
                     <Image source={this.props.imageSource} style={{width:100, height: 100, borderRadius: 100, position: 'absolute'}} />
                     <Image source={{uri: 'https://i.imgur.com/gr7Zvft.png' }} style={styles.image_circle}/>
                   </View>
                  </TouchableOpacity>
                    <View>
                     <Item stackedLabel>
                      <Label style={{fontSize: 12}}>Nome:</Label>
                      <Input
                        style={{fontSize: 12}}
                        placeholder={this.props.namePlaceholder}
                        onChangeText={this.props.onChangeTextName}
                      />
                    </Item>
                    <Item stackedLabel>
                      <Label style={{fontSize: 12}}>Email</Label>
                      <Input
                        style={{fontSize: 12}}
                        placeholder={this.props.emailPlaceholder}
                        onChangeText={this.props.onChangeTextEmail}
                      />
                    </Item>
                  </View>
                </View>
              </Body>
            </CardItem>
          </Card>

  )
  }
}

const styles = StyleSheet.create({
  image_circle: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  view_circle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 100 / 2,
  },
});