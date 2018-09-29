import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default class Local extends React.Component {
  render() {
    return(
      <View style={styles.local}>
        <View style={styles.localInfo}>
          <Text style={styles.localName}>
            {this.props.data.name}
          </Text>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({

  local: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#333',
    height: 120,
    borderRadius: 5,
    marginTop: 20,
  },
  localInfo:{
    marginLeft: 0,
  },
  localName: {
    fontWeight: 'bold',
    color: '#333'
  },

});
