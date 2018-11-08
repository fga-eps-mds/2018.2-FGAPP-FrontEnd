import React, { Component } from 'react'
import {
  View,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';


class AddImages extends Component {

  render() {
    return (
      <TouchableOpacity>
        <Icon
          name="ios-add-circle-outline"
          size={45}
        />
      </TouchableOpacity>
    );
  }
}

export default AddImages