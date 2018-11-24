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

class Offers extends Component {
	// productImage initialize with an image cause of asynchronous request
	constructor(props) {
		super(props);
		this.state = {
			products: [{
				name: '',
				price: '',
				photo: 'https://res.cloudinary.com/integraappfga/image/upload/v1541537829/senk2odnxamopwlkmyoq.png',
			}],
			refreshing: false,
		};
	}

	loadOffers = async () => {
		const { state } = this.props.navigation;
		var token = state.params ? state.params.token : undefined;
		var products_path = `${process.env.VENDAS_API}/api/all_products/`;

		fetch(products_path, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				'token': token,
			}),
		})
			.then((response) => { return response.json() })
			.then((responseJson) => {
				if (responseJson.length > 1) {
					responseJson.sort((product1, product2) => {
						return (product1.price - product2.price);
					});
				}
				this.setState({ products: responseJson });
			})
			.catch((error) => {
				console.error(error);
			});
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
		var token = state.params ? state.params.token : undefined;
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
