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
      const {state} = this.props.navigation;
      var token = state.params ? state.params.token : undefined;
        return (
            <View style={styles.container}>
              <Fab onPress={() => {this.props.navigation.navigate('CreateProduct', {token:token});} } style={{ backgroundColor: '#0EAC6F' }}>
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
