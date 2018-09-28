import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    Switch,
} from "react-native";
import CadastroEventos2 from './CadastroEventos2'

//Abrir issue depois para trocar icones para import {Icon} from 'react-native-elements'
//https://react-native-training.github.io/react-native-elements/docs/icon.html
import { MaterialIcons, MaterialCommunityIcons, Foundation} from '@expo/vector-icons';
import { Platform } from 'react-native';

export default class CadastroEventos1 extends Component {

    state = {
        nomeRole: '',
        linkRef: '',
        nomeContato: '',
        telefone: '',
        valorIngresso:'',
        local: '',
        mapsLink: '',
        data: '',
        hora: ''
    }


    continuar() {
        this.props.navigation.navigate('CadastroEventos2');
    }

    render() {
        return(
            <View style={styles.container}>
                <ScrollView 
                    //style={{alignContent: 'center'}}
                    style={styles.scroll}
                >
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>
                            Cadastrar novo rolê
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
                            placeholder="Nome do Rolê"
                            returnKeyType='next'
                            onSubmitEditing={() => this.refDescricao.focus()}
                            placeholderTextColor='black'
                            value={this.state.nomeRole}
                            onChangeText={nomeRole => this.setState({nomeRole})}
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
                            placeholder="Link de Referência"
                            //underlineColorAndroid='transparent'
                            placeholderTextColor='black'
                            returnKeyType='next'
                            onSubmitEditing={() => this.refName.focus()}
                            ref={refLinkRef => this.refLinkRef = refLinkRef}
                            value={this.state.refLink}
                            onChangeText={refLink => this.setState({refLink})}
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

                    <View style={styles.inputContainer}>
                        <Foundation
                            style={styles.icon}
                            name="prohibited"
                            size={30}
                        />
                        <Switch
                                style={styles.switch}
                            />
                    </View>

                    <View style={styles.submitButton}>
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={ () => this.continuar() }
                        >
                            <Text style={styles.buttonText}>
                                Próximo
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
    image: {
        flex: 1,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'limegreen'
    },
    scroll: {
        alignContent: 'center',
    },
    switch: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
    },
    icon: {
        padding: 5,
        alignContent: 'center',
        alignItems:'center'
    },
});