import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView
} from "react-native";
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
import LocalMap from "../components/LocalMap.js";
import Icon from 'react-native-vector-icons/Ionicons';
import { Dimensions } from "react-native";
import { withNavigation } from 'react-navigation';
import OpeningHoursPanel from '../components/OpeningHoursPanel';
import FavoriteContainer from "./FavoriteContainer";
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import AddImages from "./AddImages";

width = Dimensions.get('window').width;

class ViewLocal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      local: props.navigation.state.params ? props.navigation.state.params.local : undefined,
    };
  }
  favMessage = (fav) => {
    showMessage({
      message: fav ? "Removido dos favoritos" : "Adicionado aos favoritos",
      type: fav ? "warning" : "success",
      position: "center",
      icon: fav ? "info" : "success",
      duration: 900
    });
  }

  render() {
    const {
      id,
      name,
      description,
      address,
      latitude,
      longitude,
      telephone,
      local_ratings,
      opening_hours,
    } = this.state.local ? this.state.local : undefined;

    return (
      <View style={styles.container}>

        <ScrollView>
          <Content>

            <ImageBackground style={styles.imageLocal} source={require('../assets/fga.jpg')}>
              <FlashMessage position="top" />
              <View style={styles.addImage}>
                <AddImages />
              </View>
            </ImageBackground>

            <View style={styles.localContainer}>

              <View style={styles.localHeader}>
                <View>
                  <Text style={styles.localInfoTitle}>{name}</Text>
                </View>
                <View style={styles.localHeart}>
                  <FavoriteContainer
                    favMessageView={this.favMessage}
                    id={id}
                  />
                </View>
              </View>


              {this.displayLocalMap(latitude, longitude, name, description)}

              <Card>
                <CardItem header bordered>
                  <Text style={styles.localInfoTitle}>
                    Informações:
                    {opening_hours[0]['day'][0]}
                  </Text>
                </CardItem>

                {this.displayJsxInformation(telephone, icon = 'md-call')}

                {this.displayJsxInformation(address, icon = 'md-pin')}

                {this.displayJsxOpeningHours(opening_hours, icon = 'md-clock')}
              </Card>

              {this.displayJsxDescription(description)}

              {this.displayJsxRating(local_ratings)}

            </View>
          </Content>
        </ScrollView>
      </View>
    );
  }

  displayLocalMap(latitude, longitude, name, description) {
    if (latitude && longitude) {
      return (
        <Card style={{ flex: 1 }}>
          <View style={styles.localMap}>
            <LocalMap
              latitude={latitude}
              longitude={longitude}
              name={name}
              description={description}
            />
          </View>
        </Card>
      );
    }
  }

  displayJsxInformation(info, icon) {
    if (info) {
      return (
        <View style={styles.fieldInfo}>
          <Icon style={styles.localInfoIcons}
            name={icon}
            color='black'
            size={25}
          />
          <Text style={styles.localInfo}>
            {info}
          </Text>
        </View>
      );
    }
  }

  displayJsxOpeningHours(opening_hours = {}, icon) {
    if (!(Object.keys(opening_hours).length === 0)) {
      return (
        <View style={styles.fieldHours}>
          <Icon style={styles.localInfoIcons}
            name={icon}
            color='black'
            size={25}
          />
          <View style={styles.localHours}>
            <OpeningHoursPanel
              opening_hours={opening_hours} />
          </View>
        </View>
      );
    }
  }

  displayJsxDescription(description) {
    if (description) {
      return (
        <Card>
          <CardItem header bordered>
            <Text style={styles.localInfoTitle}>
              Descrição:
            </Text>
          </CardItem>
          <CardItem>
            <Text style={styles.description}>
              {description}
            </Text>
          </CardItem>
        </Card>
      );
    }
  }

  displayJsxRating(local_ratings = {}) {
    if (!(Object.keys(local_ratings).length === 0)) {
      let average = 0;
      for (const index in local_ratings) {
        average += local_ratings[index]['value'];
      }
      average = average / local_ratings.length;
      return (
        <Card>
          <CardItem header bordered>
            <Text style={styles.localInfoTitle}>
              Avaliação:
                </Text>
          </CardItem>
          <CardItem>
            <Icon style={styles.localInfoIcons}
              name='md-star'
              color='black'
              size={25}
            />
            <Text style={styles.localInfo}>{average}</Text>
          </CardItem>
        </Card>
      );
    }
  }

}

export default withNavigation(ViewLocal);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    position: "absolute",
    backgroundColor: "white",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  localContainer: {
    padding: 10,
  },
  imageLocal: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    height: 230,
    width: width
  },
  localHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    top: 10
  },
  addImage: {
    margin: 10,
  },
  localName: {
    width: 250,
    fontSize: 20,
    marginTop: 10,
    marginLeft: 15,
    marginBottom: -25,
  },
  localHeart: {
    bottom: 15,
    marginLeft: 20
  },
  localMap: {
    height: 180,
    width: '100%',
  },
  localInfoIcons: {
    left: 20,
    position: 'relative'
  },
  localInfoTitle: {
    color: '#333',
    left: 20,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 7
  },
  localInfo: {
    left: 50,
    top: -22,
    marginBottom: -10,
  },
  localHours: {
    top: -12,
    width: '100%',
    marginLeft: 20,
  },
  fieldInfo: {
    marginTop: 10,
    marginRight: 10,
    width: '80%',
  },
  fieldHours: {
    marginTop: 10,
    marginRight: 10,
    width: '80%',
    flexDirection: 'row',
  },
  fieldDescription: {
    marginTop: 10,
    marginRight: 10,
    width: '100%',
  },
  description: {
    fontSize: 16,
    top: -22,
    marginTop: 20,
    marginBottom: 10,
  }
});
