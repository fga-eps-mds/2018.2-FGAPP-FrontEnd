/*
    Screen responsable to show the products of a certain owner.
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
                <Text>Offer</Text>
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
