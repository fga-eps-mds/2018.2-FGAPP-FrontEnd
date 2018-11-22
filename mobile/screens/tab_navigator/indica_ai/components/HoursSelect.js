import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker'

export default class HoursSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sla: this.props.option,
      takeOpeningHours: props.takeOpeningHours
    };
  }

  selectOpeningHours = (time) => {
    this.props.takeOpeningHours(time)
    this.setState({sla: time})
  }

  render() {
    return (
      <DatePicker
        style={{flex: 1}}
        mode="time"
        showIcon={false}
        placeholder={this.state.sla}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(date) => this.selectOpeningHours(date)}
      />
    );
  }
}
