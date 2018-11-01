import React, { Component } from "react"
<<<<<<< HEAD
import { Card, CardItem, Icon, Button } from "native-base"
import { View, ScrollView, Text, StyleSheet } from "react-native"
import { MapView, Location, Permissions } from "expo"
import { Marker, Circle } from "react-native-maps"

import CardHeader from "./CardHeader"

const latLngDelta = 0.005
=======
import { Card, CardItem, Icon } from "native-base"
import { View, Text, StyleSheet } from "react-native"
import CardHeader from './CardHeader'
>>>>>>> origin/roles-app/event-comments

class Localizacao extends Component {
	static navigationOptions = {
		title: "<MapView />"
	}

	state = {
		enderecoRole: "",
		region: {
			latitude: 0,
			longitude: 0,
			latitudeDelta: latLngDelta,
			longitudeDelta: latLngDelta
		},
		coordenadaRole: {
			//Valores Padrões para Latitude e Longitude. Servem para caso a informação dada de localização não seja válida
			latitude: -15.7856594,
			longitude: -47.8959588,
			latitudeDelta: latLngDelta,
			longitudeDelta: latLngDelta
		},
		alignLocalBtn: false
	}

	componentDidMount() {
		Permissions.askAsync(Permissions.LOCATION)
		this._getLocalizationFromAddress()
			.then( () => {
				this._getAddressFromCoordinates()				
			})
			.then( () => {
				this.setState({ region: this.state.coordenadaRole })
				// console.log(JSON.stringify(this.state.coordenadaRole))
			})
	}

	_onRegionChange(region) {
		this.setState({ region })
	}

	_getAddressFromCoordinates = async () => {
		try {
			let result = await Location.reverseGeocodeAsync({
				latitude: this.state.coordenadaRole.latitude,
				longitude: this.state.coordenadaRole.longitude
			})
			this.setState({ enderecoRole: result[0] })
		} catch (e) {
			this.setState({ error: e })
		}
	}

	// Pra definir o local onde o marcador vai ficar
	_getLocalizationFromAddress = async () => {
		try {
			let result = await Location.geocodeAsync(this.props.placeRef)
			this.setState({
				coordenadaRole: {
					latitude: result[0].latitude,
					longitude: result[0].longitude,
					latitudeDelta: latLngDelta,
					longitudeDelta: latLngDelta
				}
			})
		} catch (e) {
			this.setState({ error: e })
		}
	}

	render() {
		const { enderecoRole } = this.state

		return (
<<<<<<< HEAD
			<View>
				<Card>
					<CardHeader text="Localização" />
=======
			<Card>
				<CardHeader text="Localização"/>
>>>>>>> origin/roles-app/event-comments

					<CardItem>
						<Icon name="pin" style={styles.pinIcon} />

						<View style={{ width: "100%", marginLeft: 20 }}>
							<Text style={{ fontWeight: "bold" }}>
								{this.props.placeName}
							</Text>
							<Text style={{ color: "grey" }}>
								{enderecoRole.city != null &&
									enderecoRole.city + ", "}
								{enderecoRole.street != null &&
									enderecoRole.street + ", "}
								{enderecoRole.name != null &&
									enderecoRole.name + "\n"}
								{enderecoRole.region != null &&
									enderecoRole.region + " - "}
								{enderecoRole.country != null &&
									enderecoRole.country + "\n"}
								{enderecoRole.postalCode != null &&
									enderecoRole.postalCode + "\n"}
							</Text>
						</View>
					</CardItem>

					{this.state.region.latitude != 0 && (
						<ScrollView style={styles.mapView}>
							<MapView
								ref={ref => {
									this._mapView = ref
								}}
								style={{
									width: "100%",
									height: 250
								}}
								region={this.state.region}
								initialRegion={this.state.coordenadaRole}
								onRegionChangeComplete={region =>
									this._onRegionChange(region)
								}
								loadingEnabled={true}
							>
								<Marker
									coordinate={{
										latitude: this.state.coordenadaRole
											.latitude,
										longitude: this.state.coordenadaRole
											.longitude
									}}
									title={this.props.placeName}
									description={"Local do Rolê"}
								/>
								<Circle
									center={{
										latitude: this.state.coordenadaRole
											.latitude,
										longitude: this.state.coordenadaRole
											.longitude
									}}
									radius={20}
									strokeWidth={2}
									strokeColor="green"
								/>
							</MapView>
						</ScrollView>
					)}
					<Text style={styles.coordinates}>
						Latitude: {this.state.region.latitude} / Longitude:{" "}
						{this.state.region.longitude}
					</Text>

					<Button
						onPress={() => {
							this._mapView.animateToCoordinate({
								latitude: this.state.coordenadaRole.latitude,
								longitude: this.state.coordenadaRole.longitude
							})
						}}
						block
						style={styles.centralizeBtn}
					>
						<Icon name="locate" style={{ color: "black" }} />
						<Text> Realinhar Localização</Text>
					</Button>
				</Card>
			</View>
		)
	}
}

export default Localizacao

const styles = StyleSheet.create({
	mapView: {
		borderWidth: 1,
		borderColor: "grey",
		width: "95%",
		alignSelf: "center"
	},
	coordinates: {
		color: "grey",
		textAlign: "center",
		alignSelf: "center",
		fontSize: 10,
		marginBottom: 10
	},
	pinIcon: {
		fontSize: 50,
		color: "black"
	},
	centralizeBtn: {
		marginBottom: 10,
		alignSelf: "center",
		width: "95%",
		backgroundColor: "white",
		borderWidth: 1,
		borderColor: "black",
		borderRadius: 20
	}
})
