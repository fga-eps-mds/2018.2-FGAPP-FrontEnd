import React, { Component } from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import * as firebase from 'firebase'

export default class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    register = async () => {
        const {email , password} = this.state;

        try {
            const user = await firebase.auth();
            user.createUserWithEmailAndPassword(email, password);
            alert(user);
        } catch (error) {
            alert(error);
        }
    }

    isLoged() {
        const user = firebase.auth();
        user.onAuthStateChanged(
            (actualUser) => {
                if(actualUser) {
                    alert("usuario está logado")
                } else {
                    alert("usuario não esta logado")
                }
            }
        );
    }

    render() {
        return(
            <View>
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
                    onPress={() => this.register()}>
                    <Text style={styles.buttonText}>
                        Cadastrar
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    input: {
        fontSize: 20,
        height: 45,
        borderRadius: 30,
        backgroundColor: '#adebad',
        marginBottom: 10,
        color: 'black'
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },

})