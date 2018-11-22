import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView
} from "react-native";
import {
  Content,
  Card,
  CardItem,
  Text,
  Label,
  Icon
} from 'native-base';
import LocalMap from "../components/LocalMap.js";
import { Dimensions } from "react-native";
import { withNavigation } from 'react-navigation';
import OpeningHoursPanel from '../components/OpeningHoursPanel';
import FavoriteContainer from "./FavoriteContainer";
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import AddImages from "./AddImages";
import Direction from "./Direction";
import Swiper from "react-native-swiper"

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
      opening_hours,
      categories,
      local_ratings,
      local_images
    } = this.state.local ? this.state.local : undefined;
    return (

      <View style={styles.container}>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Content>

          <Swiper
            style={styles.wrapper}
            activeDot = {<View style={styles.activeDot} />}
          >
            {this.displayLocalImage(local_images, id)}
           </Swiper>

            <View style={styles.localContainer}>

              <View style={styles.localHeader}>
                <View>
                  <Label style={styles.localName}>{name}</Label>
                </View>
                <View style={styles.localHeart}>
                  <FavoriteContainer
                    favMessageView={this.favMessage}
                    id={id}
                  />
                </View>
              </View>

              {this.displayLocalMap(latitude, longitude, name, description)}

              {this.displayCategories(categories)}

              <Card style={styles.cardInfo}>
                <CardItem header bordered>
                  <Text style={styles.localInfoTitle}>
                    Informações:
                  </Text>
                </CardItem>

                {this.displayJsxInformation(telephone, icon = 'md-call')}

                {this.displayJsxInformation(address, icon = 'md-pin')}

                {this.displayJsxOpeningHours(opening_hours, icon = 'md-clock')}

                {this.displayJsxInfoEmpty(telephone, address, opening_hours)}
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
            <View style={{ position: "absolute", left: 0, bottom: 0 }}>
              <Direction
                latitude={latitude}
                longitude={longitude}
              />
            </View>
          </View>
          <FlashMessage position="top" />
        </Card>
      );
    }
  }

  displayCategories(categories = {}) {
    if (!(Object.keys(categories).length === 0)) {
      return (
        <Card style={styles.cardCategories}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {categories.map(category =>
              <CardItem style={styles.cardCategory} key={category.id}>
                <Label style={styles.textCategory}>{category.name}</Label>
              </CardItem>
            )}
          </ScrollView>
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

  displayJsxInfoEmpty(telephone, address, opening_hours = {}) {
    if (!telephone && !address && (Object.keys(opening_hours).length === 0)) {
      return (
        <View style={styles.fieldInfoEmpty}>
          <Icon style={styles.localInfoIcons}
            name='sad'
            color='black'
            size={25}
          />
          <Text style={styles.localInfo}>
            Não há Informações!
          </Text>
        </View>
      );
    }
  }

  displayJsxDescription(description) {
    if (description) {
      return (
        <Card style={styles.cardInfo}>
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
        <Card style={styles.cardInfo}>
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

  displayLocalImage(local_images = [], id){
    if(local_images.length !== 0){
      local_images.reverse();
      local_images = [...local_images, {addSpace: "Adding a new space"}]
      return(local_images.map(
        (image,key) => {
          key ++;
          return (
            key === local_images.length ?
            <View style={styles.addImage} key = {key}>
            <ImageBackground style={styles.imageLocal} source={require("../assets/Integra.png")}>
                <AddImages
                  id={id}
                  />
            </ImageBackground>
            </View>
            :
            <View style={styles.swiper} key = {key}>
              <ImageBackground style={styles.imageLocal} source={{uri: `data:image/jpg;base64,${image.image}`}} />
            </View>
          )
        }
      ))
    } else {
      return(
        <View style={styles.addImage}>
        <ImageBackground style={styles.imageLocal} source={require("../assets/Integra.png")}>
            <AddImages
              id={id}
              />
        </ImageBackground>
          </View>);
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
  cardInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    padding: 10
  },
  cardCategories: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    padding: 10
  },
  cardCategory: {
    backgroundColor: 'white',
    borderColor: '#0AACCC',
    borderWidth: 2,
    borderRadius: 15,
    height: 40,
    margin: 3
  },
  textCategory: {
    textAlign: 'center',
    fontSize: 10,
    color: '#0AACCC'
  },
  imageLocal: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 230,
    width: width
  },
  localHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '80%',
    top: 10,
    alignItems: "stretch"
  },
  addImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0AACCC"
  },
  localName: {
    color: '#333',
    left: 20,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 7
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
    fontSize: 20,
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
  fieldInfoEmpty: {
    marginTop: 30,
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
  },
  wrapper: {
    height: 220
  },
  swiper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB'},
  activeDot: {
    backgroundColor: '#fff',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3}

});
