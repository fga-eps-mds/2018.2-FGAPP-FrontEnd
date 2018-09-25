import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import * as firebase from 'firebase'


export default class CadastroEventosScreen extends Component {

    state = {
        titulo: '',
        descricao: '',
        organizador: '',
        preco: '',
        quantidadeVagas: '',
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
                quantidadeVagas: '',
                local: '',
                comidas: '',
                data: '',
            }
        );
        //roles.ref('/roles/').set(this.state.titulo);

        //database.ref('/roles/').remove();
    }

    render() {
        return(
            <View style={styles.mainContainer}>

                <View style={styles.titleContainer}>
                    <Text>
                        Cadastrar Evento
                    </Text>
                </View>
                <View style={styles.textInputContainer}>
                    
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Título"
                        underlineColorAndroid='transparent'
                        placeholderTextColor='black'
                        value={this.state.titulo}
                        onChangeText={titulo => this.setState({titulo})}
                    />
                
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Descrição"
                        underlineColorAndroid='transparent'
                        placeholderTextColor='black'
                        onChangeText={descricao => {this.setState({descricao})}}
                    />

                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Organizador"
                        underlineColorAndroid='transparent'
                        placeholderTextColor='black'
                        onChangeText={organizador => {this.setState({organizador})}}
                    />
                
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Preço"
                        underlineColorAndroid='transparent'
                        keyboardType='numeric'
                        placeholderTextColor='black'
                        onChangeText={preco => {this.setState({preco})}}
                    />

                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Quantidade de vagas"
                        underlineColorAndroid='transparent'
                        keyboardType='numeric'
                        placeholderTextColor='black'
                        onChangeText={quantidadeVagas => {this.setState({quantidadeVagas})}}
                    />

                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Local"
                        underlineColorAndroid='transparent'
                        placeholderTextColor='black'
                        onChangeText={local => {this.setState({local})}}
                    />

                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Comidas"
                        underlineColorAndroid='transparent'
                        placeholderTextColor='black'
                        onChangeText={comidas => {this.setState({comidas})}}
                    />
                
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Data"
                        underlineColorAndroid='transparent'
                        keyboardType='numeric'
                        placeholderTextColor='black'
                        onChangeText={data => {this.setState({data})}}
                    />
                </View>

                <View style={styles.submitButton}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={ () => { this.cadastrarRole() } }>
                        <Text style={styles.buttonText}>
                            Cadastrar Rolê
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 10,
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInputContainer: {
    },
    submitButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 20,
    },
    textInputStyle: {
        fontSize: 20,
        height: 45,
        borderRadius: 30,
        backgroundColor: '#adebad',
        marginBottom: 10,
        color: 'black'
    },
    input: {
        height: 45,
        backgroundColor: 'white',
        alignSelf: 'stretch',
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 30,
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
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
});