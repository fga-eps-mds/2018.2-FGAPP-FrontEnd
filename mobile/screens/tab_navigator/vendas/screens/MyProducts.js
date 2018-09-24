/*
    Screen responsable to show the products of a certain owner.
*/

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { Container, Header, Content, Icon, Fab } from 'native-base';

class Offers extends Component {
    render() {
        return (
            <View style={styles.container}>
              <Fab style={{backgroundColor: '#0EAC6F'}}>
                <Icon name='md-add' />
              </Fab>
            </View>
        );
    }
}
export default Offers;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#171717',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
