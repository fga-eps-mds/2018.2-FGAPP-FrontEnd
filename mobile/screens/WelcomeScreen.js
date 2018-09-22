import React, { Component } from 'react';
import { 
    View,
    StyleSheet,
    Button
} from 'react-native';

class WelcomeScreen extends Component {

    static navigationOption = {
        header: 'none'
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    title='log in'
                    onPress={() => this.props.navigation.navigate('LoginScreen')}
                />
                <Button
                    title='Sign Up'
                    onPress={() => this.props.navigation.navigate('SignUpScreen')}
                />
            </View>
        );
    }
}
export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
