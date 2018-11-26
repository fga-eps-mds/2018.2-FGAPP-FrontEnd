import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import React, { Component } from "react";
import {View,Button, Text, Card, CardItem, Body } from 'native-base';
import { Constants, Location, Permissions } from 'expo';
import {
  StyleSheet,
  Image,
  ScrollView
} from "react-native";
import { Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import Expo from "expo";
import { withNavigation } from 'react-navigation';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height / 2;

class LocalDetails extends Component {

  dispatchSendData = () =>{
    this.props.sendData(this.props.data);
  }

    render(){
        return(
          <View style = {styles.container}>
            <ScrollView
              style={styles.card}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.localName}>{this.props.name}</Text>
              <Text numberOfLines={2} style = {styles.localAddress}>
                    {'Endereço:'} {this.props.address}
              </Text>
              <View style={styles.cardFooter}>
                <Button
                  block
                  info
                  style={styles.button}
                  onPress={this.dispatchSendData}
                >
                  <Text> Salvar local </Text>
                </Button>
                <Text style={styles.localName}> Não encontrou seu local? </Text>
                <Button
                  block
                  info
                  style={styles.button}
                  bordered
                  onPress={() => {
                    this.props.navigation.navigate("RegisterAPI",
                    {latitude:this.props.latitude, longitude:this.props.longitude,
                     address:this.props.address})
                  }}
                >
                  <Icon
                    name='location'
                    color='#0AACCC'
                    size={25}
                  />
                  <Text style={{color: '#0AACCC'}}>Cadastre já!</Text>
                </Button>
              </View>
            </ScrollView>
          </View>
        );
    }
}

export default withNavigation(LocalDetails);

const styles = StyleSheet.create({
    container: {
      position:"absolute",
      top: "60%",
      bottom: "1%",
      left: 0,
      right: 0,
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: '#dbdbd6',
      paddingHorizontal: 15,
      paddingTop: 12
    },
    card: {
      width: "100%",
      marginBottom: 15
    },
    localName: {
      fontWeight: 'bold',
      marginBottom: 10
    },
    localAddress:{
      fontSize: 13.5,
      flex: 1,
      marginBottom: 13
    },
    cardFooter: {
      alignItems: 'center',
      width: '100%',
      marginRight: 10
    },
    button: {
      padding: 10,
      width: '100%',
      marginBottom: 10,
    },
    buttonRegister: {
      backgroundColor: 'white',
      color: '#0AACCC'
    },
  });
