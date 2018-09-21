import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class Settings extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Settings</Text>
            </View>
        );
    }
}
export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});