import React, { Component}   from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { Card, CardItem } from 'native-base' 


export default class Local extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    const name = this.props.name;
    const description = this.props.description;
  
    return(
        <Card style={styles.localCard}> 
        
         <CardItem header bordered>
            <Text style={styles.localName}>
             {name}
           </Text>
         </CardItem>

         <CardItem>
            <Text style={styles.localDescription}>
              {description}
           </Text>
         </CardItem>

        </Card>
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
