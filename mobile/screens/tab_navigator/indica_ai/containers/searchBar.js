import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";

class SearchBar extends Component{
    render(){
        return(
            <View
            style={{ flexDirection: "row", marginHorizontal: 1, marginTop: 1 }}
          >
            <TextInput
              
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
            <TouchableOpacity >
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
export default SearchBar;