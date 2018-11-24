import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Content, Accordion, Icon } from "native-base";

class OpeningHoursPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "teste",
      opening_hours: props.opening_hours,
    };
  }

  _renderHours(opening_hours) {
    return (
      opening_hours.map(hour =>
        `${this._displayDay(hour['day'])} : ${hour['opens']} - ${hour['closes']}\n\n`
      )
    )
  }

  _displayDay(day_number) {
    if (day_number) {
      let day;
      switch (day_number) {
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

  render() {
    const { opening_hours } = this.state;
    const dataArray = [
      { title: "Horários", content: this._renderHours(opening_hours) }
    ];

    return (
      <Content padder>
        <Accordion
          dataArray={dataArray}
          content={dataArray.content}
          headerStyle={{ backgroundColor: "#0AACCC"}}
          contentStyle={{ backgroundColor: "#fff" }}
        />
      </Content>
    );
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
});