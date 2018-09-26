import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import CadastroEventos2 from './CadastroEventos2'
import * as firebase from 'firebase'

import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default class CadastroEventos1 extends Component {

    state = {
        titulo: '',
        descricao: '',
        organizador: '',
        preco: 0,
        quantidadeVagas: 0,
        local: '',
        comidas: '',
        data: '',
    }

    cadastrarRole() {
        var roles = firebase.database().ref("Roles");
        //roles.push().child("titulo").set(this.state.titulo);
        roles.push().set(
            {
                titulo: this.state.titulo,
                descricao: this.state.descricao,
                organizador: this.state.organizador,
                preco: this.state.preco,
                quantidadeVagas: this.state.quantidadeVagas,
                local: this.state.local,
                comidas: this.state.comidas,
                data: this.state.data,
            }
        );

        
        this.props.navigation.navigate('Feed');
        //roles.ref('/roles/').set(this.state.titulo);

        //database.ref('/roles/').remove();
    }

    continuar() {
        this.props.navigation.navigate('CadastroEventos2');
    }

    render() {
        return(
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.titleContainer}>
                        <Text>
                            Cadastrar Evento
                        </Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialIcons
                            style={styles.icon}
                            name="title"
                            size={26}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Título"
                            //underlineColorAndroid='transparent'
                            placeholderTextColor='black'
                            value={this.state.titulo}
                            onChangeText={titulo => this.setState({titulo})}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialIcons
                            style={styles.icon}
                            name="insert-link"
                            size={26}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Link de referência"
                            //underlineColorAndroid='transparent'
                            placeholderTextColor='black'
                            onChangeText={() => {}}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialIcons
                            style={styles.icon}
                            name="person"
                            size={26}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nome para contato"
                            //underlineColorAndroid='transparent'
                            placeholderTextColor='black'
                            onChangeText={() => {}}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialIcons
                            style={styles.icon}
                            name="phone"
                            size={26}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Telefone"
                            //underlineColorAndroid='transparent'
                            placeholderTextColor='black'
                            onChangeText={() => {}}
                            alignSelf="stretch"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialIcons
                            style={styles.icon}
                            name="attach-money"
                            size={26}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Valor do ingresso"
                            //underlineColorAndroid='transparent'
                            placeholderTextColor='black'
                            onChangeText={() => {}}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialIcons
                            style={styles.icon}
                            name="phone"
                            size={26}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Telefone"
                            //underlineColorAndroid='transparent'
                            placeholderTextColor='black'
                            onChangeText={() => {}}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialIcons
                            style={styles.icon}
                            name="place"
                            size={26}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Local"
                            //underlineColorAndroid='transparent'
                            placeholderTextColor='black'
                            onChangeText={() => {}}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialCommunityIcons
                            style={styles.icon}
                            name="google-maps"
                            size={26}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Link localização Google Maps"
                            //underlineColorAndroid='transparent'
                            placeholderTextColor='black'
                            onChangeText={() => {}}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialIcons
                            style={styles.icon}
                            name="today"
                            size={26}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Data"
                            //underlineColorAndroid='transparent'
                            placeholderTextColor='black'
                            onChangeText={() => {}}
                        />

                        <MaterialIcons
                            style={styles.icon}
                            name="access-time"
                            size={26}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Horário de início"
                            //underlineColorAndroid='transparent'
                            placeholderTextColor='black'
                            onChangeText={() => {}}
                        />
                    </View>

                    <View style={styles.submitButton}>
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={ () => this.continuar() }
                        >
                            <Text style={styles.buttonText}>
                                Continuar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    titleContainer: {
        backgroundColor: 'gray',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 30,
        marginBottom: 5,
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    input: {
       flex: 1,
       paddingTop: 10,
       paddingRight: 10,
       paddingBottom: 10,
       paddingLeft: 0,
       backgroundColor: '#fff',
       color: '#424242',
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
    submitButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    icon: {
        padding: 5,
    },
    inputTime: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'limegreen',
        width: 150,
        marginBottom: 10,
    }
});