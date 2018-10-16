import { TextField } from 'react-native-material-textfield';;
import { Constants, ImagePicker, Permissions } from 'expo';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
  Image
} from 'react-native';

var tk
async function register() {
  const { status } = await Expo.Permissions.askAsync(
    Expo.Permissions.NOTIFICATIONS
  );
  if (status != 'granted') {
    alert('You need to enable permissions in settings');
    return;
  }

  const value = await Expo.Notifications.getExpoPushTokenAsync();
  tk = value;
  console.log(status, value);
}

export default class PrivateNotifications extends Component {
  componentWillMount() {
    register();
    this.listener = Expo.Notifications.addListener(this.listen);
  }
  componentWillUnmount() {
    this.listener && Expo.Notifications.addListener(this.listen);
  }

  listen = ({ origin, data }) => {
    console.log('cool data', origin, data);
  }

  constructor(props) {
    super(props);

    this.plateRef = this.updateRef.bind(this, 'plate');
    this.messageRef = this.updateRef.bind(this, 'message');
    this.onFocus = this.onFocus.bind(this);

    this.state = {
      title: 'Notificação',
      plate: '',
      message: '',
      image: null,
      uploading: false,
    }
  }
   
  onFocus() {
    let { errors = {} } = this.state;

    for (let text in errors) {
      let ref = this[text];

      if (ref && ref.isFocused()) {
        delete errors[text];
      }
    }

    this.setState({ errors });
  }

  onChangeText(words) {
    ['plate']
    .map((text) => ({ text, ref: this[text] }))
    .forEach(({ text, ref }) => {
      if (ref && ref.isFocused()) {
        this.setState({ [text]: words });
      }
    });
    ['message']
    .map((text) => ({ text, ref: this[text] }))
    .forEach(({ text, ref }) => {
      if (ref && ref.isFocused()) {
        this.setState({ [text]: words });
      }
    });
  }

  // onSubmitFirstName() {
  //   this.lastname.focus();
  // }

  onPressButton = () => {
    let errors = {};
    const url = 'http://192.168.1.4:8002/send_push_message/' //function send_push_message url
    let errorPlate = false;
    let errorMessage = false;

    ['plate']
    .forEach((text) => {
      let value = this[text].value();

      if (!value) {
        errors[text] = 'Campo obrigatório.';
        errorPlate = true;
      } else {
        if ('plate' === text && value.length < 8) {
          errors[text] = 'Placa inválida. Ex.:AAA-0000';
          errorPlate = true;
        }
      }
    });

    ['message']
    .forEach((text) => {
      let value = this[text].value();

      if (!value) {
        errors[text] = 'Campo obrigatório.';
        errorMessage = true;
      } else {
        if ('message' === text && value.length < 5) {
          errors[text] = 'Forneça mais detalhes do ocorrido.';
          errorMessage = true;
        }
      }
    });

    if (errorPlate == false && errorMessage == false) {
      let notification = JSON.stringify({
        sender_id: tk,
        title: this.state.title,
        plate: this.state.plate,
        message: this.state.message,
        image: this.state.image
      })

      console.log(notification);

      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: notification
      }).then(response => { return response.json() }
      ).then(jsonResponse => {
        console.log(jsonResponse);
        Alert.alert("Notificação enviada!")
      }      
      ).catch(error => {
        console.log(error)
        Alert.alert("Placa não existe!")
      })
    }
    this.setState({ errors });
  }

  updateRef(text, ref) {
    this[text] = ref;
  }

  render() {
    let { image } = this.state;
    let { errors = {}, ...data} = this.state;
    let {plate = 'text'} = data;
    let {message = 'text'} = data;

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.header}>Notificações</Text>
          <TextField
            ref={this.plateRef}
            value={data.plate}
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onFocus={this.onFocus}
            onChangeText={ (plate) => this.setState({ plate }) }
            // onChangeText={this.onChangeText}
            // onSubmitEditing={this.onSubmitPLate}
            returnKeyType='next'
            label='Placa'
            tintColor = '#5c68c3'
            underlineColorAndroid="transparent"
            maxLength={8}
            autoCapitalize="characters"
            error={errors.plate}
          />
          <TextField
            ref={this.messageRef}
            value={data.message}
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onFocus={this.onFocus}
            onChangeText={ (message) => this.setState({ message }) }
            // onChangeText={this.onChangeText}
            // onSubmitEditing={this.onSubmitMessage}
            returnKeyType='next'
            label='Descrição'
            tintColor = '#5c68c3'
            error={errors.message}
          />
          <Text style={styles.text}>Adicionar imagem</Text>
          <View style={styles.alternativeLayoutButtonContainer}>
            <Button onPress={this._takePhoto}
                    title="                Camera                "
                    color='#5c68c3' />
            <Button  onPress={this._pickImage}
                     title="        Galeria        "
                     color='#313869' />
          </View>
          {this._maybeRenderImage()}
          {this._maybeRenderUploadingOverlay()}
          <View style={styles.container1}>
            <Button onPress={this.onPressButton}
                    title='Enviar Notificação'
                    color='#5c68c3' />
          </View>
        </View>
      </ScrollView>
    );
  }

  _maybeRenderUploadingOverlay = () => { //done
    if (this.state.uploading) {
      return (
        <View
          style={styles.maybeRenderUploading}>
          <ActivityIndicator color="#313869" size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => { //done
    let {
      image
    } = this.state;

    if (!image) {
      return;
    }

    // onPress={this._copyToClipboard}
    // onLongPress={this._share}

    return (
      <View
        style={styles.maybeRenderContainer}>
        <View
          style={styles.maybeRenderImageContainer}>
          <Image source={{ uri: image }} style={styles.maybeRenderImage} />
        </View>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => { //Done
    const {
      status: cameraPerm
    } = await Permissions.askAsync(Permissions.CAMERA);

    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

  // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });

      this._handleImagePicked(pickerResult);
    }
  };

  _pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

  // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,

      });

      this._handleImagePicked(pickerResult);
    }
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({
        uploading: true
      });

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();

        console.log(uploadResult.image)

        this.setState({
          image: uploadResult.image
        });
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({
      uploading: false
      });
    }
  };
}

  async function uploadImageAsync(uri) {
    let apiUrl = 'http://192.168.1.4:8002/notificationsimage/';

    // Note:
    // Uncomment this if you want to experiment with local server
    //
    // if (Constants.isDevice) {
    //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
    // } else {
    //   apiUrl = `http://localhost:3000/upload`
    // }

    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append('image', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    console.log(uri)

    let options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
    return fetch(apiUrl, options);
  }

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16
  },
  text: {
    paddingTop: 16,
    color: '#5c68c3',
    fontWeight: 'bold',
  },
  alternativeLayoutButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 4,
    paddingRight: 4,
  },
  container1: {
    paddingTop: 32,
  },
  header: {
    color: '#5c68c3',
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 50,
    marginTop: 25
  },
  maybeRenderUploading: {
    paddingTop: 8,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.0)',
    justifyContent: 'center',
  },
  maybeRenderContainer: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    elevation: 2,
    marginTop: 32,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5
  },
  maybeRenderImageContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: 'hidden',
  },
  maybeRenderImage: {
    height: 250,
    width: 250,
  }
});




//         <View style={styles.container1}>
//           <TouchableOpacity
//             style={styles.button}
//             color="#5c68c3"
//             onPress={this.onPressButton}
//             containerViewStyle={{width: '40%'}}
//           >
//           <Text style={{color: 'white'}}>Enviar</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {},
//   container1: {
//     marginTop: 80,
//     justifyContent: 'center',
//     flexDirection: 'row'
//   },
//   input1: {
//     width: 300,
//     height: 30,
//     borderBottomWidth: 1,
//     alignSelf: 'center',
//     textAlign: 'left',
//     borderBottomColor: '#5c68c3',
//     marginTop: 30,
//     textAlignVertical: 'top',
//   },
//   input2: {
//     width: 300,
//     height: 30,
//     borderBottomWidth: 1,
//     alignSelf: 'center',
//     textAlign: 'left',
//     borderBottomColor: '#5c68c3',
//     marginTop: 30,
//   },
//   button: {
//     backgroundColor: "#c8cdea", 
//     borderRadius: 15,
//     height: 40,
//     width: 121,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center'    
//   },

// });
