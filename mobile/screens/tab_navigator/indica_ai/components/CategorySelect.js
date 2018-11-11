import React, { Component } from "react";
import {
  StyleSheet
} from "react-native";
import {
  Container,
  Item,
  Picker
} from 'native-base'

export default class CategorySelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      categories: []
    };
  }

  componentWillMount() {
    const url = fetch(`https://dev-indicaai.herokuapp.com/categories`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "aplication/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ 
          categories: responseJson
        })
        // this.state.categories = responseJson;
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log(this.state.categories);
      })
      .catch(error => {
        console.log(error);
      });
  };

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  render() {
    // const { categories } = this.state
    console.log("//////////////////////////////////////////////////////////")
    console.log(this.state.categories)
    return (
      <Container style={styles.container}>
        <Item
          style={styles.form}
          picker
          regular
        >
          <Picker
            mode="dropdown"
            placeholder="Categoria"
            selectedValue={this.state.selected}
            onValueChange={this.onValueChange.bind(this)}
          >
            {this.state.categories.map(category =>
              <Picker.Item label={category.name} value={category.id} />
            )}
          </Picker>
        </Item>
      </Container>
    );

  }

}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: "white",
    padding: 20,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  form: {
    marginBottom: 10
  }
});
