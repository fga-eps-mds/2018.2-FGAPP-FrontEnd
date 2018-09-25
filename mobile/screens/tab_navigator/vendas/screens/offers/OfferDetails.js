import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

class OfferDetails extends Component {
    render() {
      const {state} = this.props.navigation;
      var product = state.params ? state.params.product : undefined;
      return (
          <View style={styles.container}>
              <Text>{product.productName}</Text>
          </View>
      );
    }
}
export default OfferDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
