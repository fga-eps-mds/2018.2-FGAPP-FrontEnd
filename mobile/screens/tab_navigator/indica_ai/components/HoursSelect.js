import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker'

export default class HoursSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      option: this.props.option
    };
  }


  selectOpeningHours = (time) => {

    let opens: ''
    let closes: ''
    this.props.option == 'Abre' ? opens=time : closes=time;

    if(this.props.week){
      if(this.props.day==1){
        this.props.takeOpeningHours(8, opens, closes)
        this.setState({option: time})
      }else{
        this.props.takeOpeningHours(9, opens, closes)
        this.setState({option: time})
      }
    }else{
      this.props.takeOpeningHours(this.props.day, opens, closes)
      this.setState({option: time})
    }
  }


  render() {
    return (
      <DatePicker
        style={{flex: 1}}
        mode="time"
        showIcon={false}
        placeholder={this.state.option}
        customStyles={{
          placeholderText: {
            color: 'black'
          },
          dateInput:{
            borderWidth: 0.2,
            borderColor: 'black'
          }
        }}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(date) => this.selectOpeningHours(date)}
      />
    );
  }
}
