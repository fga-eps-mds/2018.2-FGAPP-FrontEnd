import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet
} from 'react-native';

class UserProfile extends Component {
    render() {
        const {state} = this.props.navigation;
        var token = state.params ? state.params.token : undefined;
        const userInfo = state.params ? state.params.userInfo : undefined;

        return (
            <View style={styles.container}>
                <Text>{userInfo.name}</Text>
                <Text>Teste</Text>
                <Text>{userInfo.photo}</Text>
                <Text>Teste</Text>
                <Text>{userInfo.email}</Text>
            </View>
        );
    }
}
export default UserProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});