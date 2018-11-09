import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { ImagePicker } from 'expo';
import { SERVER_URI, PostFunStuff } from '../../constant';
import PropTypes from 'prop-types';


class AddImages extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
    this.pickImage = this.pickImage.bind(this);
    this.postImage = this.postImage.bind(this);
  }

  pickImage = async () => {
    const result = await ImagePicker.lauchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
    });

    if(!result.cancelled) { 
      this.setState({
        image: result.uri,
      });
    } 
  };  
  
  render() {
    return (
      <TouchableOpacity>
        <Icon
          name="ios-add-circle"
          size={60}
          color = 'white'
        />
      </TouchableOpacity>
    );
  }
}

export default AddImages