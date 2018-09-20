import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView
} from "react-native";
import ProductCard from './component/ProductCard'

const defaultImage = require("./assets/food.jpg");

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
        <View style={styles.container}>
            <ScrollView>
                <ProductCard
                productImage = {defaultImage}
                productName = "Bolo no pote"
                productPrice = "13.00"/>
                <ProductCard
                productImage = {defaultImage}
                productName = "Acai no pote"
                productPrice = "15.00"/>
                <ProductCard
                productImage = {defaultImage}
                productName = "Sorvete no pote"
                productPrice = "12.00"/>

                {/* <TouchableOpacity onPress={this.handlePress.bind(this)}>
                <Text style={{paddingTop: 50, paddingLeft: 50, color: '#FF0000'}}> Clica em mim para testar api mocada </Text>
                </TouchableOpacity> */}
            </ScrollView>
        </View>
        );
    }
}
export default VendasApp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#171717',
        width: '100%',
    }
});
