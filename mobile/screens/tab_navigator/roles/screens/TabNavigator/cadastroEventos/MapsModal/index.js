import React, { Component } from "react";
import { Card, CardItem, Body, Icon, Button, Input } from "native-base";
import {
	Text,
	StyleSheet,
	View,
} from "react-native";
import Modal from "react-native-modal";
import { MapView, Location, Permissions } from "expo";
import { Marker } from "react-native-maps";

const latLngDelta = 0.005;

export default class MapsModal extends Component {
	state = {
		address: "",
		coordenadaRole: {
			//Valores Padrões para Latitude e Longitude. Servem para caso a informação dada de localização não seja válida
			latitude: -15.7856594,
			longitude: -47.8959588,
			latitudeDelta: latLngDelta,
			longitudeDelta: latLngDelta
		},
		region: {
			latitude: 0,
			longitude: 0,
			latitudeDelta: latLngDelta,
			longitudeDelta: latLngDelta
		}
	};

	componentDidMount() {
		Permissions.askAsync(Permissions.LOCATION);
	}

	_getLocalizationFromAddress = async address => {
		try {
			let result = await Location.geocodeAsync(address);
			console.log(JSON.stringify(result));
			this._mapView.animateToCoordinate({
				latitude: result[0].latitude,
				longitude: result[0].longitude,
				latitudeDelta: latLngDelta,
				longitudeDelta: latLngDelta
			});
			this.setState({
				coordenadaRole: {
					latitude: result[0].latitude,
					longitude: result[0].longitude,
					latitudeDelta: latLngDelta,
					longitudeDelta: latLngDelta
				}
			});
		} catch (e) {
			this.setState({ error: e });
		}
	};

	_onRegionChange(region) {
		this.setState({ region });
	}

	render() {
		return (
			<Modal
				isVisible={this.props.visible}
				onBackButtonPress={this.props.closeModal}
				onBackdropPress={this.props.closeModal}
				animationIn="fadeInUp"
				animationOut="fadeOutDown"
			>
				<Card style={styles.modalCardInput}>
					<View>
						<Text style={{ margin: 10, textAlign: "center" }}>
							Informe o nome do local do evento para pesquisar:
						</Text>
						<View width="100%" flexDirection="row">
							<Input
								placeholder="Endereço"
								multiline={false}
								width="90%"
								style={{ textAlign: "center" }}
								onChangeText={text =>
									this.setState({ address: text })
								}
							/>
							<Button
								transparent
								onPress={() => {
									console.log(
										"DEBUG BTN: ",
										this.state.address
									);
									this._getLocalizationFromAddress(
										this.state.address
									);
								}}
							>
								<Icon
									name="search"
									style={{ color: "black" }}
								/>
							</Button>
						</View>

						<MapView
							ref={ref => (this._mapView = ref)}
							style={{ height: 200, width: "100%" }}
							initialRegion={{
								latitude: -15.7856594,
								longitude: -47.8959588,
								latitudeDelta: latLngDelta,
								longitudeDelta: latLngDelta
							}}
							onRegionChangeComplete={region =>
								this._onRegionChange(region)
							}
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
						</MapView>
					</View>

					<View>
						<Text style={{ textAlign: "center", margin: 10 }}>
							O local apresentado no mapa está correto?
						</Text>

						<Button block success style={styles.btn}>
							<Text style={{ color: "white" }}>
								Sim, é ali mesmo!
							</Text>
						</Button>
					</View>

					<View
						width={200}
						margin={10}
						borderWidth={1}
						borderColor="rgba(0,0,0,0.1)"
						alignSelf="center"
					/>

					<View marginBottom={10}>
						<Text style={{ textAlign: "center", margin: 10 }}>
							Ainda não conseguiu encontrar o lugar?
						</Text>

						<Button block danger style={styles.btn}>
							<Text style={{ color: "white" }}>
								Buscar por Latitude e Longitude
							</Text>
						</Button>
					</View>
				</Card>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	modalCardInput: {
		backgroundColor: "white",
		borderRadius: 10,
		width: "100%",
		height: "80%",
		alignSelf: "stretch",
		alignItems: "stretch",
		justifyContent: "space-between"
	},
	btn: {
		width: "90%",
		alignSelf: "center",
		borderRadius: 10
	}
});
