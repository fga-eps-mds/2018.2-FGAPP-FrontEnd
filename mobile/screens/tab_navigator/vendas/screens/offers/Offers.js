/*
    Screen responsible to get and show all data about offers.
*/

import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	ScrollView,
	RefreshControl
} from 'react-native';
import ProductCard from '../../components/ProductCard';
import axios from 'axios';

class Offers extends Component {
	// productImage initialize with an image cause of asynchronous request
	constructor(props) {
		super(props);
		this.state = {
			products: [{
				name: '',
				price: '',
				photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3DELRuKTg7K4gi9v13ELUq3ltLxlNGOsw6BDfsF0jlVKFr4h3',
			}],
			refreshing: false,
		};
	}

	loadOffers = async () => {
		const { state } = this.props.navigation;
		var token = state.params ? state.params.token : undefined;
		var products_path = `${process.env.VENDAS_API}/api/all_products/`;

		var self = this;
        axios.post(products_path,{
            'token': token,
        })
        .then (function (response) {
            console.log('response.data', response.data);
						console.log('response.status', response.status);
			if(response.status == 200){
				if(response.data.length > 1) {
					response.data.sort((product1, product2) => {
						return (product1.price - product2.price);
					});
				}
				self.setState({ products: response.data });
			}
        })
        .catch(function (error) {
            console.log('error', error);
		})
	}

	componentDidMount() {
		this.loadOffers();
	}

	refreshOffers = async () => {
		this.setState({ refreshing: true });
		this.loadOffers().then(() => {
			this.setState({ refreshing: false });
		});
	}

	render() {
		const { state } = this.props.navigation;
		var token = this.state.params ? state.params.token : undefined;
		return (
			<View style={styles.container}>
				<ScrollView
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this.refreshOffers}
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
								onPress={() => this.props.navigation.navigate('OfferDetails', { product: product, token: token })}
							/>
						);
					})}
				</ScrollView>
			</View>
		);
	}
}

export default Offers;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    }
});
