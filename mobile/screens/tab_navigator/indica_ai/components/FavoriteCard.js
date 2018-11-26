import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import {
  Card,
  Text,
} from 'native-base';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

class FavoriteCard extends Component {
  render() {
    const description = this.props.local.description || 'Local sem descrição'
    const { name = "", local_images = [] } = this.props.local
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
            <Image source={image} style={styles.imageLocal}/>
          </View>

          <View style={styles.cardField}>
            <View style={styles.cardFieldText}>

              <View style={styles.fieldName}>
                <Icon name="ios-heart" 
                      color="red" 
                      size = {22}
                      />
                <Text numberOfLines={2} style={styles.textFavorite}> {name}</Text>
              </View>

              <View style={styles.fieldDescription}>
                <Text numberOfLines={3} style={styles.textDescription}> {description} </Text>
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
    width: '80%',
  },
  cardFieldText: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: "stretch"
  },
  fieldName: {
    flexDirection: "row",
    width:'80%'
  },
  fieldDescription: {
    width: "80%",
    marginTop: 5,
    marginRight: 10,
    marginBottom: 5,
  },
  fieldImage: {
    alignSelf: "center",
    marginLeft: 10,
  },
  imageLocal: {
    height: 100,
    width: 100,
  },
  textFavorite: {
    color: '#333',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 10,
    width: '80%'
  },
  textDescription: {
    width: 220,
  }

});