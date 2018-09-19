import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert
} from "react-native";


class VendasApp extends Component {

    handlePress = async () => {

            fetch(process.env.VENDAS_API + 'api/books', {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                }
        })
            .then((response) => response.json())
            .then((responseJson) => {
        Alert.alert("Title: " + responseJson.title + ", with price " + responseJson.price + "\n" +  process.env.VENDAS_API + 'api/books');
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render(){
        return(
            <View style={{paddingTop: 50, paddingLeft: 50 }}>
            <Text> Vendas APP </Text>
            <TouchableOpacity onPress={this.handlePress.bind(this)}>
            <Text style={{paddingTop: 50, paddingLeft: 50, color: '#FF0000'}}> Clica em mim para testar api mocada </Text>
            </TouchableOpacity>
        </View> 
        );
    }
}
export default VendasApp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});