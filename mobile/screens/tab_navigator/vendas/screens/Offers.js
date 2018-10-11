/*
    Screen responsible to get and show all data about offers.
*/

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView
} from 'react-native';
import ProductCard from '../components/ProductCard';

class MyProducts extends Component {
    // productImage initialize with an image cause of asynchronous request
    constructor(props) {
        super(props);
        this.state = {
            products: [{
                productName: '',
                productPrice: '',
                productImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3DELRuKTg7K4gi9v13ELUq3ltLxlNGOsw6BDfsF0jlVKFr4h3',
            }]
        };
    }
    // fetching and sorting data from a mock API
    componentDidMount() {
        var products_path = `${process.env.VENDAS_PRODUCTS}/products`;
        
        console.log('** HELLO')
        console.log(products_path)

        fetch(products_path, {
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
            this.setState({ products: responseJson });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {
        return (
        <View style={styles.container}>
            <ScrollView>
                {this.state.products.map((product, index) => {
                    return (
                        <ProductCard
                            key={index}
                            productImage={product.productImage}
                            productName={product.productName}
                            productPrice={product.productPrice}
                        />
                    );
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
