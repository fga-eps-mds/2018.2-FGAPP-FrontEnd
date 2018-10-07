import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView
} from "react-native";
import LocalMap from "../components/LocalMap.js";
import Icon from 'react-native-vector-icons/Ionicons';


export default class App extends Component{
  render() {
    return (
        <View style={styles.container}>
          <Image style={{height: 230, width: 360}}
            source={require('../assets/fga.jpg')}
          />
          <View style={styles.info}>
            <Text style={styles.localName}>
              Universidade de Brasília - Faculdade do Gama [FGA]
            </Text>
            <Icon style={styles.localHeart}
              name='ios-heart-outline'
              color='black'
              size={30}
            />
            <View style={styles.hr}></View>
            <View style={styles.localMap}>
              <LocalMap/>
            </View>
            <View style={styles.hr}></View>
            <Icon style={styles.localInfoIcons}
              name='md-call'
              color='black'
              size={25}
            />
            <Icon style={styles.localInfoIcons}
              name='md-pin'
              color='black'
              size={25}
            />
            <Icon style={styles.localInfoIcons}
              name='md-clock'
              color='black'
              size={25}
            />
            <View style={styles.hr}></View>
            <Text style={styles.localRating}>
              Avaliação:
            </Text>
            <Icon style={styles.localInfoIcons}
              name='md-star'
              color='black'
              size={25}
            />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position:"absolute",
    backgroundColor: "white",
    top:0,
    bottom:0,
    left:0,
    right:0
  },
  info:{
    position: 'absolute',
    top: 230,
    padding: 10,
  },
  hr:{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: 330,
    left: 4.5,
    marginVertical: 10
  },
  localName:{
    width: 250,
    fontSize: 20,
    marginTop: 10,
    marginLeft: 15,
    marginBottom: -25,
  },
  localHeart:{
    marginLeft: 285,
    top: -15
  },
  localMap:{
    height: 180,
    width: 340
  },
  localInfoIcons:{
    left: 20
  },
  localRating:{
    left: 20,
    fontSize: 16
  }
});
