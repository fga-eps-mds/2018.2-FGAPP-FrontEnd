/*
    Screen responsable to show the products of a certain owner.
*/

import ProductCard from '../../components/ProductCard'

import React, { Component } from 'react';
import { RefreshControl, Alert } from 'react-native';
import {
	View,
	StyleSheet,
	ScrollView
} from 'react-native';
import { Icon, Fab } from 'native-base';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

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
		const { state } = this.props.navigation;
		var token = state.params ? state.params.token : undefined;
		var user = jwt_decode(token);
		const my_products_screen_path = `${process.env.VENDAS_API}/api/my_products_screen/`;

		var self = this;
      	axios.post(my_products_screen_path,{
			'user_id': user.user_id,
			'token': token,
		})
		.then (function (response) {
			console.log('response.data', response.data);
			console.log('response.status', response.status);
			if (response.data.length > 1) {
				response.data.sort((product1, product2) => {
					return (product1.price - product2.price);
				});
			}
			self.setState({ products: response.data });
		})
		.catch(function (error) {
			console.log('error', error);
		})
		
	}

	refreshUserProducts = async () => {
		this.setState({ refreshing: true });
		this.loadUserProducts().then(() => {
			this.setState({ refreshing: false });
		})
	}

	componentDidMount() {
		this.loadUserProducts();
	}

  render() {
			const { state } = this.props.navigation;
			var token = state.params ? state.params.token : undefined;
        return (
            <View style={styles.container}>
                <View>
                  <ScrollView
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.refreshUserProducts}
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
								onPress={() => {this.props.navigation.navigate('MyProductDetails', {token:token, product:product})} }
							/>
						);
					})}
                  </ScrollView>
                </View>
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
        width: '100%',
    },
    fab: {
        backgroundColor: '#0EAC6F',
    }
});
