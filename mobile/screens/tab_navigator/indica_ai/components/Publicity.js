import React, { Component}   from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import { Card, CardItem } from 'native-base'


export default class Publicity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //onPress: props.onPress,
    }
  }
  render() {

    const name = 'this.props.name';
    const address = 'this.props.address';

    return(
      <TouchableOpacity>
        <Card style={styles.localCard}>

         <CardItem header bordered>
            <Text style={styles.localName}>
             {name}
           </Text>
         </CardItem>

         <CardItem>
            <Text style={styles.localAddress}>
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

  localAddress: {
    marginLeft: 0,
    fontSize: 15
  },
  localName: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 20
  }

});
