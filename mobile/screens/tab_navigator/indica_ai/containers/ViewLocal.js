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
import { Dimensions } from "react-native";
import { withNavigation } from 'react-navigation';
import FavoriteContainer from "./FavoriteContainer";
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";

width = Dimensions.get('window').width;

class ViewLocal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      local: props.navigation.state.params ? props.navigation.state.params.local : undefined,
    };
  }
  favMessage = (fav)=>{
      showMessage({
               message: fav ?  "Removido dos favoritos": "Adicionado aos favoritos" ,
               type: fav ? "warning":"success",
               position: "center",
               icon: fav ? "info":"success",
               duration: 900
             });
  }

  render() {
    const { id, name, description } = this.state.local;
    console.log("______________      ID        ______________________________");
    console.log(id);
    return (
        <View style={styles.container}>
          <ScrollView>
            <Image style={{height: 230, width: width}}
              source={require('../assets/fga.jpg')}
            />
            <View style={styles.localContainer}>
            <View style={{
     flex: 1,
     flexDirection: 'row',
     justifyContent: 'flex-start',
     top: 10
   }}>
     <View>
      <Text style = {{fontSize: 20}}>{name}</Text>
     </View>
     <View style = {{top: -15}}>
      <FavoriteContainer
       favMessageView = {this.favMessage}
     />
     </View>
   </View>
              <View style={styles.hr}></View>
              <View style={styles.localMap}>
                <LocalMap/>
              </View>
              <View style={styles.hr}></View>
              <Text style={styles.localInfoTitle}>
                Informações:
              </Text>
              <View style={styles.fieldDescription}>
                <Text style={styles.localInfo}>
                  {description}
                </Text>
              </View>
              <Icon style={styles.localInfoIcons}
                name='md-call'
                color='black'
                size={25}
              />
              <Text style={styles.localInfo}>(61) 4002-8922</Text>
              <Icon style={styles.localInfoIcons}
                name='md-pin'
                color='black'
                size={25}
              />
              <Text style={styles.localInfo}>Qd 90 Lt 99 Setor de Industria</Text>
              <Icon style={styles.localInfoIcons}
                name='md-clock'
                color='black'
                size={25}
              />
              <Text style={styles.localInfo}>6:00 - 22:00</Text>
              <View style={styles.hr}></View>
              <Text style={styles.localInfoTitle}>
                Avaliação:
              </Text>
              <Icon style={styles.localInfoIcons}
                name='md-star'
                color='black'
                size={25}
              />
                <Text style={styles.localInfo}>4.0</Text>
            </View>
          </ScrollView>
        <FlashMessage position="top"/>
        </View>
    );
  }
}

export default withNavigation(ViewLocal);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    position:"absolute",
    backgroundColor: "white",
    top:0,
    bottom:0,
    left:0,
    right:0,
  },
  localContainer:{
    padding: 10,
  },
  hr:{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: 330,
    left: 4.5,
    marginVertical: 10
  },
  localMap:{
    height: 180,
    width: 320,
    left: 10
  },
  localInfoIcons:{
    left: 20
  },
  localInfoTitle:{
    left: 20,
    fontSize: 18,
    marginBottom: 7
  },
  localInfo:{
    left: 50,
    top: -22,
    marginBottom: -10
  },
  fieldDescription:{
    marginTop: 20,
    marginRight: 10,
    width: '80%',
  }
});
