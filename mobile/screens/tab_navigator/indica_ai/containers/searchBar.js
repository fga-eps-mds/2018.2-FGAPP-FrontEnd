import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { connect } from 'react-redux'

class SearchBar extends Component{

  state = {
     text: ''
  }

  searchLocals = (text) => {
    //reedux store
    this.props.dispatch({type:'SEARCH', text})
    this.setState({text: ''})
  }   
    render(){
        return(
            <View
            style={{ flexDirection: "row", marginHorizontal: 1, marginTop: 1 }}
          >
            <TextInput
              onChangeText={(text) => this.setState({ text })}
              value={this.state.text} 
              placeholder="Buscar Indicação"
              style={{
                borderWidth: 1,
                borderColor: "gray",
                backgroundColor: "#eaeaea",
                height: 50,
                flex: 1,
                padding: 5
              }}
            />
            <TouchableOpacity onPress={()=> this.searchLocals(this.state.text)}>
              <View style={{ height: 50, backgroundColor: "#eaeaea" }}>
                <Ionicons
                  name="md-search"
                  size={30}
                  style={{
                    color: "#0AACCC",
                    padding: 10
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        );
    }
}
export default connect()(SearchBar);