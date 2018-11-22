import React, { Component } from 'react'
import { TouchableOpacity, View,Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ImagePicker } from 'expo';
import ImageModal from "../components/ImageModal";
import SuccessModal from '../components/SuccessModal';
import ErrorModal from '../components/ErrorModal';


class AddImages extends Component {

  constructor(props) {
    super(props);
    this.state = {
      successModalVisible: false,
      errorModalVisible: false,
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

    }
  };

  postImage = async () => {
    const id = this.state.id
    const indicaAiUrl = `${process.env.INDICA_AI_API}/local/${id}/images/`;
    const uri = this.state.image;
    this.setState({ ImageModalVisible: false })
    try {
      const response = await fetch(indicaAiUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'image': [this.state.image.base64]
        })
      })
      const jsonResponse = await response.json()
      if (jsonResponse['status'] === "SUCCESS") {
        this.setState({ successModalVisible: true })
      } else {
        this.setState({ errorModalVisible: true })
      }
    }
    catch (error) {
      this.setState({ errorModalVisible: true })
    }
  };

  cancelPost() {
    this.setState({
      ImageModalVisible: false
    });
  }

  render() {

    return (
      <View>
        <ImageModal
          onSendImage={() => this.postImage()}
          visible={this.state.ImageModalVisible}

          onCancel={() => this.cancelPost()}
          visible={this.state.ImageModalVisible}
        />
        <TouchableOpacity style = {{flex:1, justifyContent: "center", alignItems: "center"}} 
        onPress={() => this.pickImage()}>
            <Icon
                name="add-a-photo"
                size={60}
                color='white'
            />
            <Text style = {{fontSize: 16, color: "#fff"}}>Enviar uma nova imagem</Text>
        </TouchableOpacity>
        <SuccessModal
          onCancel={() => this.setState({ successModalVisible: false })}
          visible={this.state.successModalVisible}
          message="Imagem Enviada com Sucesso"
        />
        <ErrorModal
          onCancel={() => this.setState({ errorModalVisible: false })}
          visible={this.state.errorModalVisible}
          message="Error ao Enviar Imagem"
        />
      </View>
    );
  }
}

export default AddImages
