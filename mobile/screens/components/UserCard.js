import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Image,
  TextInput
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
          <Card style={{height:150}}>
            <CardItem style={{height:'100%'}}>
              <Body>
                <View style={{flex: 1, flexDirection: 'row', width: '100%', height:120}}>
                  <View style={{width:120, height: '100%'}}>
                    <Image source={this.props.imageSource} style={{width:100, height: 100}} />
                  </View>
                  <View style={{width: '60%', height: '100%'}}>
                    <Item fixedLabel>
                      <Label style={{fontSize: 12}}>Nome:</Label>
                      <Input
                        style={{fontSize: 12}}
                        value={this.props.nameValue}
                        placeholder={this.props.namePlaceholder}
                      />
                    </Item>
                    <Item fixedLabel last>
                      <Label style={{fontSize: 12}}>Email</Label>
                      <Input
                        style={{fontSize: 12}}
                          value={this.props.emailValue}
                          placeholder={this.props.emailPlaceholder}
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
