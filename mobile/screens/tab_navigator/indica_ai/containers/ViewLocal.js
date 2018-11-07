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
import OpeningHoursPanel from '../components/OpeningHoursPanel';

width = Dimensions.get('window').width;

class ViewLocal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      local: props.navigation.state.params ? props.navigation.state.params.local : undefined,
    };
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
    } = this.state.local;

    return (
      <ScrollView style={styles.container}>
        <Image style={{ height: 230, width: width }}
          source={require('../assets/fga.jpg')}
        />

        <View style={styles.localContainer}>
          <Text style={styles.localName}>
            {name}
          </Text>
          <Icon style={styles.localHeart}
            name='ios-heart-outline'
            color='black'
            size={30}
          />

          <View style={styles.hr}></View>

          {this.displayLocalMap(latitude, longitude, name, description)}

          <Text style={styles.localInfoTitle}>
            Informações:
          </Text>

          {this.displayJsxInformation(telephone, icon = 'md-call')}

          {this.displayJsxInformation(address, icon = 'md-pin')}

          {this.displayJsxOpeningHours(opening_hours, icon = 'md-clock')}

          <View style={styles.fieldDescription}>
            {this.displayJsxDescription(description)}
          </View>

          {this.displayJsxRating(local_ratings)}

        </View>
      </ScrollView>
    );
  }

  displayLocalMap(latitude, longitude, name, description) {
    if (latitude && longitude) {
      return (
        <View>
          <View style={styles.localMap}>
            <LocalMap
              latitude={latitude}
              longitude={longitude}
              name={name}
              description={description}
            />
          </View>
          <View style={styles.hr}></View>
        </View>
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

  displayJsxOpeningHours(opening_hours, icon) {
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
              title="Horários"
              opening_hours={opening_hours} />
          </View>
        </View>
      );
    }
  }

  displayJsxDescription(description) {
    if (description) {
      return (
        <View style={styles.fieldDescription}>
          <View style={styles.hr}></View>
          <Text style={styles.localInfoTitle}>
            Descrição:
          </Text>
          <Text style={styles.description}>
            {description}
          </Text>
        </View>
      );
    }
  }

  displayJsxRating(local_ratings) {
    if (!(Object.keys(local_ratings).length === 0)) {
      let average = 0;
      for (const index in local_ratings) {
        average += local_ratings[index]['value'];
      }
      average = average / local_ratings.length;
      return (
        <View style={styles.fieldInfo}>
          <View style={styles.hr}></View>
          <Text style={styles.localInfoTitle}>
            Avaliação:
          </Text>
          <Icon style={styles.localInfoIcons}
            name='md-star'
            color='black'
            size={25}
          />
          <Text style={styles.localInfo}>{average}</Text>
        </View>
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
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: 330,
    left: 4.5,
    marginVertical: 10
  },
  localName: {
    width: 250,
    fontSize: 20,
    marginTop: 10,
    marginLeft: 15,
    marginBottom: -25,
  },
  localHeart: {
    marginLeft: 285,
    top: -15
  },
  localMap: {
    height: 180,
    width: 320,
    left: 10
  },
  localInfoIcons: {
    left: 20,
    position: 'relative'
  },
  localInfoTitle: {
    left: 20,
    fontSize: 18,
    marginBottom: 7
  },
  localInfo: {
    left: 50,
    top: -22,
    marginBottom: -10,
  },
  localHours: {
    left: 10,
    top: -12,
    width: '100%',
    marginBottom: -10,
  },
  fieldInfo: {
    marginTop: 10,
    marginRight: 10,
    width: '80%',
  },
  fieldHours: {
    flex: 1,
    marginTop: 10,
    marginRight: 10,
    width: '80%',
    flexDirection: 'row',
  },
  fieldDescription: {
    marginTop: 10,
    marginRight: 10,
    width: '80%',
  },
  description: {
    fontSize: 16,
    left: 50,
    top: -22,
    marginTop: 20,
    marginBottom: 10,
  }
});
