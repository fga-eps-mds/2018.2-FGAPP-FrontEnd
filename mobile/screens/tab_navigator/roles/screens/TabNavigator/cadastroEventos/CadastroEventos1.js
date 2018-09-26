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
                <ScrollView style={{alignContent: 'center'}}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>
                            Cadastrar Evento
                        </Text>
                    </View>

                    <View style={styles.photoUpload}>
                        <View style={styles.photoUpload2}>
                            <MaterialIcons
                                name="insert-photo"
                                size={100}
                            />
                            <Text style={styles.photoText}>
                                Adicionar uma imagem
                            </Text>
                        </View>
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
                            returnKeyType='next'
                            onSubmitEditing={() => this.refDescricao.focus()}
                            onChangeText={titulo => this.setState({titulo})}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialIcons
                            style={styles.icon}
                            name="description"
                            size={26}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Descrição"
                            //underlineColorAndroid='transparent'
                            placeholderTextColor='black'
                            multiline={true}
                            ref={refDescricao => this.refDescricao = refDescricao}
                            onChangeText={() => {}}
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
                            returnKeyType='next'
                            onSubmitEditing={() => this.refName.focus()}
                            ref={refLinkRef => this.refLinkRef = refLinkRef}
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
                            returnKeyType='next'
                            onSubmitEditing={() => this.refTelefone.focus()}
                            ref={refName => this.refName = refName}
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
                            keyboardType='phone-pad'
                            ref={refTelefone => this.refTelefone = refTelefone}
                            //underlineColorAndroid='transparent'
                            onSubmitEditing={() => this.refValor.focus()}
                            returnKeyType='next'
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
                            returnKeyType='next'
                            ref={refValor => this.refValor = refValor}
                            onSubmitEditing={() => this.refLocal.focus()}
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
                            returnKeyType='next'
                            ref={refLocal => this.refLocal = refLocal}
                            onSubmitEditing={() => this.refMaps.focus()}
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
                            returnKeyType='next'
                            ref={refMaps => this.refMaps = refMaps}
                            onSubmitEditing={() => this.refData.focus()}
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
                            returnKeyType='next'
                            ref={refData => this.refData = refData}
                            onSubmitEditing={() => this.refHora.focus()}
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
                            returnKeyType='next'
                            ref={refHora => this.refHora = refHora}
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
        backgroundColor: '#fff',
    },
    titleContainer: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    titleText: {
        fontSize: 30,
        marginBottom: 5,
        fontWeight: 'bold',
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
    },
    photoUpload: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        
        
        
        marginBottom: 20,
        
    },
    photoUpload2: {
        backgroundColor: '#fff',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'limegreen',
        height: 200,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    photoIcon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    photoText: {
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 10,
    }
});