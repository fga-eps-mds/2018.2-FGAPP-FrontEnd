import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TimePicker from 'react-native-simple-time-picker';

export default class HoursSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedHours: 0,
      selectedMinutes: 0,
      takeOpeningHours: props.takeOpeningHours
    };
  }

  selectOpeningHours = (hours, minutes) => {
    /*console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++");
    console.log(hours, minutes);*/
    //this.setState.takeOpeningHours({ takeOpeningHours })
    this.props.takeOpeningHours(hours, minutes)
  }

  render() {
    const { selectedHours, selectedMinutes } = this.state;
    return (
      <View style={styles.container}>
        <Text>{selectedHours}:{selectedMinutes}</Text>
        <TimePicker
          selectedHours={selectedHours}
          selectedMinutes={selectedMinutes}
          onChange={(hours, minutes) => this.selectOpeningHours(hours, minutes)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
