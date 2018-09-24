import React, {Component} from 'react'
import { View, Text } from 'native-base';
import HomeScreen from '../HomeScreen'
import Register from './Register'
import { Button, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import * as firebase from 'firebase'

export default class Login extends Component {



    state = {
        email: '',
        password: '',
        isAuthenticated: false,
    }


    login = async () => {
        const {email , password} = this.state;

        try {
            const user = await firebase.auth();
            user.signInWithEmailAndPassword(email, password);

            this.setState({ isAuthenticated: true });
            alert(user);
            this.props.navigation.navigate('HomeScreen');
        } catch (error) {
            alert(error);
        }

    }

    register() {
        this.props.navigation.navigate('Register')
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    "Login Screen"
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Digite seu e-mail"
                    autoCapitalize='none'
                    placeholderTextColor='black'
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                />
                
                <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        underlineColorAndroid='transparent'
                        placeholderTextColor='black'
                        value={this.state.password}
                        onChangeText={password => this.setState({password})}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.login()}
                >
                    <Text>
                        Login!
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.register()}
                >
                    <Text>
                        Cadastre-se!
                    </Text>
                </TouchableOpacity>

                {this.state.isAuthenticated ? <Text>
                    Logado com sucesso!
                </Text> : null }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    button: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:350,
        borderRadius:30,
        backgroundColor: "limegreen",
    },
    input: {
        fontSize: 20,
        height: 45,
        width: 400,
        borderRadius: 30,
        backgroundColor: '#adebad',
        marginBottom: 10,
        color: 'black',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
})