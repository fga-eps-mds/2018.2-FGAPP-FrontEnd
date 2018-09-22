import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    DatePickerAndroid,
    TouchableWithoutFeedback
} from "react-native";


export default class CadastroEventosScreen extends Component {

    cadastrarEvento() {
        
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
                    />
                
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Descrição"
                        underlineColorAndroid='transparent'
                        placeholderTextColor='black'
                    />
                
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Preço"
                        underlineColorAndroid='transparent'
                        keyboardType='numeric'
                        placeholderTextColor='black'
                    />
                
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Data"
                        underlineColorAndroid='transparent'
                        keyboardType='numeric'
                        placeholderTextColor='black'
                    />
                </View>

                <View style={styles.submitButton}>
                    <TouchableOpacity 
                        style={styles.button}>
                        <Text style={styles.buttonText}>
                            Cadastrar
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInputContainer: {
        flex: 2,
    },
    submitButton: {
        flex: 2,
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