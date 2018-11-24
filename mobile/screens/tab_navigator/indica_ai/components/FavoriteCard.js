import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import {
  Card,
  Text,
  Icon,
} from 'native-base';
import { withNavigation } from 'react-navigation';

class FavoriteCard extends Component {
  render() {
    const { name = "", description = "", local_images = [] } = this.props.local
    const image = (local_images.length !== 0) ?
      { uri: "data:image/jpg;base64," + local_images[local_images.length - 1]["image"] }
      : require('../assets/IntegraApps_icon.png')

    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('FavoriteDetailsScreen', {
            local: this.props.local
          });
        }}>

        <Card style={styles.cardFavorite}>
          <View style={styles.fieldImage}>
            <ImageBackground source={image}
              style={styles.imageLocal}
            />
          </View>
          <View style={styles.cardField}>
            <View style={styles.cardFieldText}>
              <View style={styles.fieldName}>
                <Icon name="heart" color="#333" />
                <Text numberOfLines={1} style={styles.textFavorite}> {name}</Text>
              </View>
              <View style={styles.fieldDescription}>
                <Text numberOfLines={3} style={styles.textDescription}>
                  {description}
                </Text>
              </View>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(FavoriteCard);

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
  fieldDescription: {
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
    width: 220,
  },
  textDescription: {
    width: 220,
  }

});