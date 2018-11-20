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
    this.props.takeOpeningHours(time)
  }

  render() {
    return (
      <DatePicker
        style={{width: 50}}
        mode="time"
        showIcon={false}
        placeholder={this.props.option}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(date) => this.selectOpeningHours(date)}
      />
    );
  }
}
