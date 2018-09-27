import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import CadastroEventos1 from './CadastroEventos1'

export default class CadastroEventos2 extends Component {

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

                    

                    <View style={styles.submitButton}>
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={ () => this.voltar() }>
                            <Text style={styles.buttonText}>
                                voltar
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