import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    Alert
} from "react-native";
import cadastroEventosScreen from './CadastroEventosScreen';

export default class HomeScreen extends Component {

    cadastrarEvento() {
        try {
            this.props.navigation.navigate('CadastroEventosScreen')
        } catch (error) {
            alert(error);
        }
        
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>
                    Home Screen
                </Text>
                <TouchableOpacity 
                    style={styles.botaoCadastro}
                    onPress={() => this.cadastrarEvento()}>
                    <Text style={styles.buttonText}>
                        Cadastrar evento
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
    botaoCadastro: {
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
        color: 'white'
    }
});