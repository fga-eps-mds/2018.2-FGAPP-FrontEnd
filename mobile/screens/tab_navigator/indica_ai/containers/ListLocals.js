import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Local from "../components/Local";
// import store from "./redurces/store";
// import { Provider } from "react-redux";

class ListLocals extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locals: []
        };
    }

    componentDidMount(){
    const url = fetch(`https://indicaai.herokuapp.com/locals/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "aplication/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          locals: responseJson,
        })
      })
      .catch(error => {
        console.log(error);
      });
    }
  
    render() {
        const locals = this.state.locals;
        console.log("Console");
        console.log(locals)
        console.log("Console");
        return (
          <View style={styles.listLocals}>
            <ScrollView>
              <Text>
                {locals
                  .map(local => <Local name={local.name} description={local.description} />)} 
              </Text>
            </ScrollView>
          </View>
        );
    }
}

export default ListLocals;

const styles = StyleSheet.create({
  listLocals: {
    height: 120,
    borderRadius: 5,
    marginHorizontal: 10,
  }
});
