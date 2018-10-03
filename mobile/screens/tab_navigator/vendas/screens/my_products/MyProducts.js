/*
    Screen responsable to show the products of a certain owner.
*/

import ProductCard from '../../components/ProductCard'

import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import {
    View,
    StyleSheet,
    ScrollView
} from 'react-native';
import { Icon, Fab } from 'native-base';
import jwt_decode from 'jwt-decode';

class MyProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [{
                name: '',
                price: '',
                photo: 'https://foodrevolution.org/wp-content/uploads/2018/04/blog-featured-diabetes-20180406-1330.jpg',
            }],
            refreshing: false,
        };
    }

    loadUserProducts = async () => {
        const {state} = this.props.navigation;
        var token = state.params ? state.params.token : undefined;
        var user = jwt_decode(token);

        fetch(`${process.env.VENDAS_API}/api/my_products_screen`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            'user_id': user.user_id,
            }),
        })
        .then((response) => { return response.json() })
        .then((responseJson) => {
            if(responseJson.length > 1){
                responseJson.sort((product1, product2) => {
                    return (product1.price - product2.price);
                });
            }
            this.setState({ products: responseJson });
        })
        .catch((err) => {
            console.log(err);
        })
    }

    refreshUserProducts = async () => {
        this.setState({refreshing: true});
        this.loadUserProducts().then(() => {
            this.setState({refreshing: false});
        })
    }

    componentDidMount() {
        this.loadUserProducts();
    }

    render() {
        const {state} = this.props.navigation;
        var token = state.params ? state.params.token : undefined;

        return (
            <View style={styles.container}>
                <ScrollView
                    refreshControl = {
                        <RefreshControl
                            refreshing = {this.state.refreshing}
                            onRefresh = {this.refreshUserProducts}
                        />
                    }
                >
                        {this.state.products.map((product, index) => {
                            return (
                                <ProductCard
                                    key={index}
                                    photo={product.photo}
                                    name={product.name}
                                    price={parseFloat(product.price).toFixed(2)}
                                />
                            );
                        })}
                    </ScrollView>
                <Fab
                    onPress={() => {this.props.navigation.navigate('CreateProduct', {token:token});} }
                    style={styles.fab}>
                    <Icon name='md-add' />
                </Fab>
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
    },
    fab: {
        backgroundColor: '#0EAC6F',
    }
});
