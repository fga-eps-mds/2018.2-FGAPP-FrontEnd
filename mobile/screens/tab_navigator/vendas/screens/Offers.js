/*
    Screen provided to present the products already ordered by a certain user.
*/

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

  class Offers extends Component {
    render() {
        return (
            <View style={styles.container}>
              <Text>Offers</Text>
            </View>
        );
    }
}
export default Offers;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
