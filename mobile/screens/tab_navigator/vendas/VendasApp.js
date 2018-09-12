import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class VendasApp extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>VendasApp</Text>
            </View>
        );
    }
}
export default VendasApp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});