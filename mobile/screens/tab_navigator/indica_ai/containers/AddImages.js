import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { ImagePicker } from 'expo';
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

  postImage() {
    const indicaAiUrl = `https://indicaai.herokuapp.com/${id}/images/`;
    const uri = this.state.image;
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    const  formData = new FormData();
      formData.append('photo', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${filetype}`,
      });
      
    const options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type' : 'multipart/form-data',
      },
    };
    return fetch(indicaAiUrl, formData)
  }

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