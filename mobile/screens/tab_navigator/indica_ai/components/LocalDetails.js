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
const height = Dimensions.get('window').height / 2;

export default class LocalDetails extends Component {
    render(){
        return(
            <View style = {styles.container}>
              <Card style = {styles.card}>
                <CardItem header>
                  <Text numberOfLines={1}>{this.props.name}</Text>
                </CardItem>
                <CardItem>
                  <Body>
                  <ScrollView>
                    <Text numberOfLines={2} style = {styles.text}>
                      {'Endereço:'} {this.props.adress}
                    </Text>
                  </ScrollView>
                  </Body>
                </CardItem>
                <CardItem footer>
                   <Button info style = { styles.buttom}><Text> Confirmar </Text></Button>
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
      top: "60%",
      bottom: "1%",
      left:0,
      right:0
    },
    cardFooter: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      flex: 1,
        fontSize: 15
    },
    card: {
        width: "100%",
        height: "90%",
        bottom: 0
    },
    buttom: {
      height: "90%"
    }
  });
