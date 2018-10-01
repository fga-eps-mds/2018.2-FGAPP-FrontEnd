import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
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
         console.log(this.state.locals); 
      }) 
      .catch(error => {
        console.log(error);
      });
    }
  
    render() {
        const locals = this.state.locals;
        return (
          <View style={styles.listLocals}> 
              <ScrollView>
                {locals
                  .map(local => <Local name={local.name}/>)} 
            </ScrollView>
          </View>
        );
    }
}

export default ListLocals;

const styles = StyleSheet.create({
  listLocals: {
    borderRadius: 5,
    marginHorizontal: 10,
  }
});
