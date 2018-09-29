import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform
} from "react-native";

import {MaterialIcons, Entypo} from '@expo/vector-icons'
import CadastroEventos1 from './CadastroEventos1'
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default class CadastroEventos2 extends Component {

    state = {
        eventDescription: '',
        photo: '',
        foods: '',
        drinks: ''
    }

    voltar() {
        this.props.navigation.navigate('CadastroEventos1');
    }
    
    render() {
        return(
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.titleContainer}>
                        <Text>
                            CadastroEventos2
                        </Text>
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
                            placeholderTextColor='black'
                            multiline={true}
                            onChangeText={() => {}}
                        />
                    </View>

                    <View style={styles.photoUpload}>
                        <TouchableOpacity
                            onPress={() => {}}
                        >
                            <View style={styles.photoUpload2}>
                                <MaterialIcons
                                    name="camera-alt"
                                    size={100}
                                />
                                <Text style={styles.photoText}>
                                    Adicionar uma imagem
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                        <Entypo
                            style={styles.icon}
                            name="drink"
                            size={26}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Drinks"
                            placeholderTextColor='black'
                            multiline={true}
                            onChangeText={() => {}}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <MaterialCommunityIcons
                            style={styles.icon}
                            name="food-fork-drink"
                            size={26}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Comidas"
                            placeholderTextColor='black'
                            multiline={true}
                            onChangeText={() => {}}
                        />
                    </View>

                    <View style={styles.submitButton}>
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={ () => this.voltar() }>
                            <Text style={styles.buttonText}>
                                voltar
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.button}
                            onPress={ () => this.apifetch() }>
                            <Text style={styles.buttonText}>
                                FetchApi
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
    photoUpload: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
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
    icon: {
        padding: 5,
    },
});