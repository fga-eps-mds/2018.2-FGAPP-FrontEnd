import React, { Component } from "react";
import {
  View,
  Text, 
  StyleSheet, 
  ScrollView
} from "react-native";
import Local from "../components/Local";

class ListLocals extends Component {

    state = {
      locals: []
    };
    
    componentWillMount(){
      const url = fetch(`https://indicaai.herokuapp.com/locals/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "aplication/json"
        }
      })
      .then(response => response.json())
      .then(responseJson => {
        const localsFather = this.props.locals;
        this.setState({
          locals: responseJson,
        })
         console.log(this.state.locals); 
      }) 
      .catch(error => {
        console.log(error);
      });
    }
    componentDidUpdate() {
      if(this.props.locals.length !== 0) {
        if(this.props.locals.locals[0] !== this.state.locals)
          this.setState({locals: this.props.locals.locals[0]})
      }
    }
    render() {
        return (
          <View style={styles.listLocals}> 
              <ScrollView>
                {this.state.locals
                .map(local => <Local name={local.name} style={styles.LocalsText} key={local.id}/>)} 
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
  },

  LocalsText: {
    fontSize: 45,
    fontFamily: 'sans-serif',
    marginLeft: 5
 } 
});
