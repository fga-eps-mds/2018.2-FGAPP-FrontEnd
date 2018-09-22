import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet
} from 'react-native';

class RolesApp extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Rolês</Text>
            </View>
        );
    }
}
export default RolesApp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
