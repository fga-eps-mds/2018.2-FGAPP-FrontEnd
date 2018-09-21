import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";

export default class CadastroEventosScreen extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text>
                    Cadastrar Eventos
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o nome do evento"
                    underlineColorAndroid='transparent'
                />
                <TextInput
                    style={styles.input}
                    placeholder="Digite o nome do organizador do evento"
                    underlineColorAndroid='transparent'

                />
                <TextInput
                    style={styles.input}
                    placeholder="Digite o valor"
                    underlineColorAndroid='transparent'
                    keyboardType='numeric'
                />
                <TextInput
                    style={styles.input}
                    placeholder="Digite o local"
                    underlineColorAndroid='transparent'
                />
                <TouchableOpacity 
                    style={styles.button} >
                    <Text style={styles.buttonText}>
                        Cadastrar
                    </Text>
                
                </TouchableOpacity>

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
    },
});