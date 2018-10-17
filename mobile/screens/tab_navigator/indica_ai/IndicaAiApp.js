import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet
} from 'react-native';

class FirstScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Indica ai</Text>
            </View>
        );
    }
}
export default FirstScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
