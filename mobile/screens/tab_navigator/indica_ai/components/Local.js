import React, { Component}   from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';


export default class Local extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {

    const name = this.props.name;

    return(
            <Text>{name}</Text>
    );
  }
}


const styles = StyleSheet.create({

  local: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#333',
    height: 120,
    borderRadius: 5,
    marginTop: 20,
  },
  localInfo:{
    marginLeft: 0,
  },
  localName: {
    fontWeight: 'bold',
    color: '#333'
  },

});
