import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
 class OrderDetails extends Component {
    render() {
      const {state} = this.props.navigation;
      var token = state.params ? state.params.token : undefined;
      var order = state.params ? state.params.order : undefined;
        return (
            <View style={styles.container}>
                <Text>Order ID = {order.id}</Text>
                <Text>User Token = {token}</Text>
            </View>
        );
    }
}
export default OrderDetails;
 const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
