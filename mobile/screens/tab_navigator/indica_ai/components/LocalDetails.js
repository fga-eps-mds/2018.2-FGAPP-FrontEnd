import { Platform } from 'react-native';
import React, { Component } from "react";
import {View,Button, Text, Card, CardItem, Body } from 'native-base';
import { Constants, Location, Permissions } from 'expo';
import {
  StyleSheet,
  Image,
  ScrollView
} from "react-native";
import { Dimensions } from "react-native";
import Expo from "expo";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height / 3;

export default class LocalDetails extends Component {
    render(){
        return(
            <View style = {styles.container}>
              <Card style = {styles.card}>
                <CardItem header bordered>
                  <Text>{this.props.name}</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Text style = {styles.text}>
                      {'Endereço:'} {this.props.adress}
                    </Text>
                  </Body>
                </CardItem>
                <CardItem footer style = {styles.cardFooter}>
                  <Button>
                    <Text>{'Você está aqui?'}</Text>
                  </Button>
                </CardItem>
              </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      position:"absolute",
      top:  height,
      bottom:0,
      left:0,
      right:0
    },
    cardFooter: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
        fontSize: 10
    },
    card: {
        width: "95%",
        height: "90%"
    }
  });