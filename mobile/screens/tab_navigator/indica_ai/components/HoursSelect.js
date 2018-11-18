import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker'

export default class HoursSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      takeOpeningHours: props.takeOpeningHours
    };
  }

  selectOpeningHours = (time) => {
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++");
    console.log(time);
    //this.setState.takeOpeningHours({ takeOpeningHours })
    this.props.takeOpeningHours(time)
  }

  render() {
    return (
      <DatePicker
        style={{top: 100, width: 200}}
        mode="time"
        showIcon={false}
        placeholder="select date"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(date) => this.selectOpeningHours(date)}
      />
    );
  }
}
