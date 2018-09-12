import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class CarDefenseApp extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>CarDefense</Text>
            </View>
        );
    }
}
export default CarDefenseApp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});