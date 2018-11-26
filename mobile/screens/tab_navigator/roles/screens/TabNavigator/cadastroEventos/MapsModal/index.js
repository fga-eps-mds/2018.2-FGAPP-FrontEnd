import React, { Component } from "react";
import {
	Card,
	CardItem,
	Body,
	Icon,
	Button,
	Input,
	Form,
	Item
} from "native-base";
import {
	Text,
	StyleSheet,
	View,
	ScrollView,
	Alert,
	KeyboardAvoidingView,
	ToastAndroid
} from "react-native";
import Modal from "react-native-modal";
import { MapView, Location, Permissions } from "expo";
import { Marker } from "react-native-maps";

const latLngDelta = 0.003;

export default class MapsModal extends Component {
	state = {
		searchKeyWord: "",
		address: {},
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
		},
		initialRegion: {
			latitude: -15.989373048115894,
			longitude: -48.044495824724436,
			latitudeDelta: latLngDelta,
			longitudeDelta: latLngDelta
		}
	};

	componentDidMount() {
		Permissions.askAsync(Permissions.LOCATION);
	}

	_getLocalizationFromSearch = async key => {
		try {
			let result = await Location.geocodeAsync(key);
			if (result.length > 0) {
				this._mapView.animateToCoordinate({
					latitude: result[0].latitude,
					longitude: result[0].longitude,
					latitudeDelta: latLngDelta,
					longitudeDelta: latLngDelta
				});
			} else {
				Alert.alert(
					"Endereço Inválido",
					"Não foi encontrado uma localização com este endereço."
				);
			}
		} catch (e) {
			this.setState({ error: e });
		}
	};

	_getAddressFromCoordinates = async coordinates => {
		try {
			let result = await Location.reverseGeocodeAsync({
				latitude: coordinates.latitude,
				longitude: coordinates.longitude
			});
			this.setState({ address: result[0] });
		} catch (e) {
			this.setState({ error: e });
		}
	};

	_onRegionChange(region) {
		this.setState({ region });
		// console.log("REGION:", region);
	}

	_handleBtnOk() {
		this.props.onLocationSelection(this.state.region);
		this.setState({ initialRegion: this.state.region });
	}

	_handleEscape() {
		ToastAndroid.show(
			"Você deve selecionar um local e dar OK!",
			ToastAndroid.SHORT
		);
	}

	render() {
		return (
			<Modal
				isVisible={this.props.visible}
				onBackButtonPress={() => this._handleEscape()}
				onBackdropPress={() => this._handleEscape()}
				animationIn="fadeIn"
				animationOut="fadeOut"
			>
				<Card style={styles.modalCardInput}>
					<ScrollView
						keyboardShouldPersistTaps="always"
						keyboardDismissMode="on-drag"
					>
						<View>
							<Text style={{ margin: 10, textAlign: "center" }}>
								Informe o nome do local do evento para
								pesquisar:
							</Text>

							<View
								width="100%"
								flexDirection="row"
								borderWidth={1}
								borderColor="lightgrey"
							>
								<Input
									placeholder="Pesquisar Endereço"
									multiline={false}
									width="90%"
									style={{ textAlign: "center" }}
									onChangeText={text =>
										this.setState({
											searchKeyWord: text
										})
									}
								/>
								<Button
									transparent
									onPress={() => {
										this._getLocalizationFromSearch(
											this.state.searchKeyWord
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
								initialRegion={this.state.initialRegion}
								onRegionChangeComplete={region => {
									this._onRegionChange(region);
									this._getAddressFromCoordinates(region);
								}}
							>
								<Marker
									coordinate={{
										latitude: this.state.region.latitude,
										longitude: this.state.region.longitude
									}}
									title={this.props.placeName}
									description={"Local do Rolê"}
								/>
							</MapView>
							<Text
								style={{
									alignSelf: "center",
									fontSize: 10,
									color: "grey",
									marginBottom: 10
								}}
							>
								{`${this.state.region.latitude} \ ${
									this.state.region.longitude
								}`}
							</Text>

							<Text
								style={{ textAlign: "center", color: "grey" }}
							>
								{this.state.address.city != null &&
									this.state.address.city + ", "}
								{this.state.address.street != null &&
									this.state.address.street !=
										"Unnamed Road" &&
									this.state.address.street + ", "}
								{this.state.address.name != null &&
									this.state.address.name != "Unnamed Road" &&
									this.state.address.name + "\n"}
								{this.state.address.region != null &&
									this.state.address.region + " - "}
								{this.state.address.country != null &&
									this.state.address.country + "\n"}
								{this.state.address.postalCode != null &&
									this.state.address.postalCode + "\n"}
							</Text>
						</View>

						<View
							width="100%"
							margin={5}
							borderWidth={1}
							borderColor="rgba(0,0,0,0.1)"
							alignSelf="center"
						/>

						<View marginBottom={10}>
							<Text style={{ textAlign: "center", margin: 10 }}>
								O local apresentado no mapa está correto?
							</Text>

							<Button
								block
								success
								style={styles.btn}
								onPress={() => this._handleBtnOk()}
							>
								<Text style={{ color: "white" }}>
									Sim, é ali mesmo!
								</Text>
							</Button>
						</View>
					</ScrollView>
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
		alignItems: "stretch"
	},
	btn: {
		width: "90%",
		alignSelf: "center",
		borderRadius: 10
	}
});
