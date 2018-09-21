import React, { Component } from "react";
import {
    View,
    StyleSheet,
    ScrollView
} from "react-native";
import ProductCard from '../component/ProductCard'

class MyProducts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [{
                productName: '',
                productPrice: '',
                productImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3DELRuKTg7K4gi9v13ELUq3ltLxlNGOsw6BDfsF0jlVKFr4h3',
            }]
        }
    }

    componentWillMount() {
        fetch('http://5ba400d48da2f20014654cdf.mockapi.io/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            responseJson.sort((product1, product2) => {
                return (product1.productPrice - product2.productPrice);
            });
            this.setState({products: responseJson});
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render(){
        return(
        <View style={styles.container}>
            <ScrollView>
                {this.state.products.map( (product, index) =>  {
                    return (
                        <ProductCard
                            key = {index}
                            productImage = {product.productImage}
                            productName = {product.productName}
                            productPrice = {product.productPrice}
                        />
                    )
                })}
            </ScrollView>
        </View>
        );
    }
}
export default MyProducts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#171717',
        width: '100%',
    }
});