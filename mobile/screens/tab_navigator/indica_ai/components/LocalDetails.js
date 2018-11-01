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
import Icon from 'react-native-vector-icons/Entypo';
import Expo from "expo";
import { withNavigation } from 'react-navigation';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height / 2;

class LocalDetails extends Component {
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
                <CardItem footer style={styles.cardFooter}>
                     <Button info style={styles.button} ><Text> {"Check-in"} </Text></Button>
                     <Button
                        info
                        style={styles.button}
                        bordered
                        onPress={() => this.props.navigation.navigate("RegisterAPI")}
                     >
                       <Icon
                         name='location'
                         color='#0AACCC'
                         size={25}
                       />
                       <Text style={{color: '#0AACCC'}}>Cadastrar</Text>
                     </Button>
                </CardItem>
              </Card>
            </View>
        );
    }
}

export default withNavigation(LocalDetails);

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
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row'
    },
    button: {
      padding: 10
    },
    buttonRegister: {
      backgroundColor: 'white',
      color: '#0AACCC'
    },
    text: {
      flex: 1,
        fontSize: 15
    },
    card: {
        width: "100%",
    },
  });
