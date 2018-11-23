import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  ImageBackground,
} from "react-native";
import {
  Card,
  Text,
  Icon,
} from 'native-base';

class FavoriteCard extends Component {
  render() {
    return (
      <Card style={styles.cardFavorite}>
        <View style={styles.fieldImage}>
          <ImageBackground source={require('../assets/IntegraApps_icon.png')}
            style={styles.imageLocal}
          />
        </View>
        <View style={styles.cardField}>
          <View style={styles.cardFieldText}>
            <View style={styles.fieldName}>
              <Icon name="heart" color="#333" />
              <Text style={styles.textFavorite}>Favorito 1</Text>
            </View>
            <View style={styles.fieldDescription}>
              <Text numberOfLines={3} style={styles.textDescription}>
                Descricao dessa joça, testando oq que ocorre
                quando o texto es muy grande para la carpeta del card,
                bla bla bla
              </Text>
            </View>
          </View>
        </View>
      </Card>
    );
  }
}

export default FavoriteCard;

const styles = StyleSheet.create({
  cardFavorite: {
    width: "100%",
    height: 110,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  cardField: {
    margin: 10,
  },
  cardFieldText: {
    flexDirection: "column",
  },
  fieldName: {
    flexDirection: "row",
  },
  fieldDescription:{
    width: "80%",
    marginRight: 10,
    marginBottom: 5,
  },
  fieldImage: {
    alignSelf: "center",
    marginLeft: 10,
  },
  imageLocal: {
    height: 80,
    width: 100,
  },
  textFavorite: {
    color: '#333',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  textDescription: {
    width: 220,
  }

});