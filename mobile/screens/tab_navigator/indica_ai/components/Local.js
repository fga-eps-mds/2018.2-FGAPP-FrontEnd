import React, { Component}   from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { Card, CardItem } from 'native-base';
import { withNavigation } from 'react-navigation';


 class Local extends Component {

  render() {
    const {name, address , local_images} = this.props.local 
    const image  = (local_images.length !== 0) ?
      {uri: "data:image/jpg;base64," + local_images[local_images.length - 1]["image"]}
      :require('../assets/IntegraApps_icon.png')


    return(
      <TouchableOpacity onPress={() => {
        this.props.navigation.navigate('LocalDetails',{
          local: this.props.local
        });
      }}>
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

export default withNavigation(Local);

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
