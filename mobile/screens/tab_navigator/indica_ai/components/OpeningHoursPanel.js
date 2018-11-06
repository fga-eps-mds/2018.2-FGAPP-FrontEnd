import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Animated
} from 'react-native';
import {
  Container,
  Form,
  Item,
  Input,
  Label,
  Button,
  Icon
} from 'native-base';

class OpeningHoursPanel extends Component {
  constructor(props) {
    super(props);

    this.icons = {
      up: 'arrow-dropup',
      down: 'arrow-dropdown'
    };

    this.state = {
      title: props.title,
      opening_hours: props.opening_hours,
      expanded: false,
      animation: new Animated.Value()
    };
  }

  toggle() {
    let initialValue = this.state.expanded ? this.state.maxHeight
      + this.state.minHeight : this.state.minHeight,
      finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight
        + this.state.minHeight;

    this.setState({
      expanded: !this.state.expanded
    });

    this.state.animation.setValue(initialValue);
    Animated.spring(
      this.state.animation,
      {
        toValue: finalValue
      }
    ).start();
  }


  render() {
    let icon = this.icons.down;

    if (this.state.expanded) {
      icon = this.icons.up;
    }

    return (
      <Animated.View style={[styles.container, { height: this.state.animation }]} >
        <TouchableHighlight
          style={styles.button}
          onPress={this.toggle.bind(this)}
          underlayColor="#f1f1f1">

          <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
            <Text style={styles.title}>{this.state.title}</Text>
            <Icon
              style={styles.buttonImage}
              name={icon}
            />
          </View>
        </TouchableHighlight>

        <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
          {this.state.opening_hours.map(hour =>
            <Text>{this.displayDay(hour['day'])} : {hour['opens']} - {hour['closes']}</Text>
          )}
        </View>

      </Animated.View>
    );
  }

  displayDay(day_number) {
    if(day_number){
      let day;
      switch(day_number){
        case 1:
          day = 'Domingo';
          break;
        case 2:
          day = 'Segunda-Feira';
          break;
        case 3:
          day = 'Terça-Feira';
          break;
        case 4:
          day = 'Quarta-Feira';
          break;
        case 5:
          day = 'Quinta-Feira';
          break;
        case 6:
          day = 'Sexta-Feira';
          break;
        case 7:
          day = 'Sábado';
          break;
        default:
          day = 'Indefinido';
          break;
      }
      return (
        day
      );
    }
  }

  _setMaxHeight(event) {
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    });
  }

  _setMinHeight(event) {
    this.setState({
      minHeight: event.nativeEvent.layout.height
    });
  }
}
export default OpeningHoursPanel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    padding: 10,
    color: '#2a2f43',
    fontWeight: 'bold'
  },
  buttonImage: {
    width: 30,
    height: 25,
    marginVertical: 10
  },
  body: {
    padding: 10,
    paddingTop: 0
  }
});