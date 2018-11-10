import React, { Component } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { ImagePicker } from 'expo';
import ImageModal from "../components/ImageModal";


class AddImages extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      ImageModalVisible: false,
      id: this.props.id
    };
    this.pickImage = this.pickImage.bind(this);
    this.postImage = this.postImage.bind(this);
  }

  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
      quality: 0.3,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({
        image: result,
        ImageModalVisible: true
      });

      //console.log(result);
    }
  };

  postImage() {
    const { id } = this.state.id
    const indicaAiUrl = `https://dev-indicaai.heroku.com/local/${id}/images/`;
    const uri = this.state.image;
    this.setState({ ImageModalVisible: false })
    const porra =  JSON.stringify(this.state.image.base64);

    
    const response = fetch(indicaAiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'aplication/json',
      },
      body: JSON.stringify({
        image: [this.state.image.base64]
      })
    })
    .then(console.log(response))
    .catch(error => {
      console.log(error);
    });
    console.log(response)
  };




  render() {

    return (
      <View>
        <ImageModal
          onSendImage={() => this.postImage()}
          visible={this.state.ImageModalVisible}
        />
        <TouchableOpacity onPress={() => this.pickImage()}>
          <Icon
            name="ios-add-circle"
            size={60}
            color='white'
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default AddImages