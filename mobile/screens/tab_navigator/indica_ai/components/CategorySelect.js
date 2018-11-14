import React, { Component } from "react";
import {
  StyleSheet,
  View
} from "react-native";
import {
  Container,
  Item,
  Picker
} from 'native-base'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';



export default class CategorySelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      categories: [],
      selectedCategories: props.selectedCategories
    };
  }

  onSelectedItemsChange = (selectedCategories) => {
    this.setState({ selectedCategories });
    this.props.setSelectedCategories(selectedCategories)
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
    return (
      <View>

        <SectionedMultiSelect
          items={this.state.categories}
          uniqueKey='id'
          selectText='Categorias...'
          confirmText="Confirmar"
          searchPlaceholderTextColor="red"
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedCategories}
        />

      </View>
    );

  }

}

const styles = StyleSheet.create({
  form: {
    marginBottom: 10
  },
  button: {
    backgroundColor: "#1E6738"
  },
  confirmText: {
    backgroundColor: "#1E6738"
  }
});
