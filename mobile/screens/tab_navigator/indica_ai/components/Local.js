import React, { Component}   from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { Card, CardItem } from 'native-base'


export default class Local extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onPress: props.onPress,
    }
  }
  render() {

    const name = this.props.name;
    const address = this.props.address;
    const image  = (this.props.image.length !== 0) ?
      {uri: "data:image/jpg;base64," + this.props.image[this.props.image.length - 1]["image"]}
      :require('../assets/IntegraApps_icon.png')


    return(
      <TouchableOpacity onPress={() => this.state.onPress()}>
        <Card style={styles.localCard}>

         <CardItem header bordered>
            <Text style={styles.localName}>
             {name}
           </Text>
         </CardItem>

         <CardItem cardBody style={{paddingHorizontal: 5, paddingTop: 5}}>
           <ImageBackground source={image} style={{height: 200, width: null, flex: 1, padding: 0}}>
           </ImageBackground>
         </CardItem>

         <CardItem footer bordered>
           <Text style={styles.localDescription}>
           {address}
           </Text>
         </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({

  localCard: {
      borderRadius: 7,
  },

  localDescription: {
    marginLeft: 0,
    fontSize: 15
  },
  localName: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 20
  },

});
