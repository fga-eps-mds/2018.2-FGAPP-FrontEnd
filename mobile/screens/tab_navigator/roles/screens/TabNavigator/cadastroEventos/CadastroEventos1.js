import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet,
	Alert,
	TimePickerAndroid,
	DatePickerAndroid,
	Image,
	TouchableOpacity,
	Switch,
	ActivityIndicator
} from "react-native";
import { ImagePicker } from "expo";
import { Icon, TextInput, Button, H2, Item, Input } from "native-base";

import CadastroInput from "./CadastroInput/index.js";
import MapsModal from "./MapsModal/index.js";
import ImageModal from "./ImageModal/index.js";

import config from './Config.js'

const eighteen = require("../../../static/eighteen.png");
const date = new Date();

const CryptoJS = require("crypto-js");

export default class CadastroEventos1 extends Component {
	state = {
		eventName: "",
		eventDescription: "",
		owner: "",
		linkReference: "",
		organizer: "",
		organizerTel: "",
		value: "",
		address: "",
		linkAddress: "",
		eventDate: "",
		eventHour: "",
		adultOnly: true,
		drinks: "",
		foods: "",
		photo: null,

		stage: 0,
		blocked: true,
		mapsModalVisibility: false,
		imgModalVisibility: false,

		uploading: false,
    err: false,
    
    responseStatus: 0,
    responseOk: false,
	};

	_uploadImage = uri => {
		let formdata = new FormData();
		let timestamp = ((Date.now() / 1000) | 0).toString();
		let api_key = config.api_key;
		let api_secret = config.api_secret;
		let cloud = config.cloud;
		let hash_string = "timestamp=" + timestamp + api_secret;
		let signature = CryptoJS.SHA1(hash_string).toString();
		let upload_url =
			"https://api.cloudinary.com/v1_1/" + cloud + "/image/upload";

		formdata.append("file", {
			uri: uri,
			type: "image/png",
			name: "upload.png"
		});
		formdata.append("timestamp", timestamp);
		formdata.append("api_key", api_key);
		formdata.append("signature", signature);

		let xhr = new XMLHttpRequest();
		xhr.open("POST", upload_url);

		this.setState({ uploading: true });
		console.log("Uploading photo...");

		xhr.onreadystatechange = () => {
			// console.log(xhr);

			if (xhr.readyState === 4) {
				if (xhr.status == 200) {
					const res = JSON.parse(xhr.response);
					console.log(
						"Request Status:",
						xhr.status,
						"//",
						"Image URL: ",
						res.url
					);
					this._cadastraRole(res.url);
				} else {
					this.setState({ uploading: false });
					Alert.alert("Erro!", "Ocorreu um erro ao enviar a imagem!");
					return;
				}
			}
		};
		xhr.send(formdata);
	};

	_resetStates() {
		this.setState({
			eventName: "",
			eventDescription: "",
			owner: "",
			linkReference: "",
			organizer: "",
			organizerTel: "",
			value: "",
			address: "",
			linkAddress: "",
			eventDate: "",
			eventHour: "",
			adultOnly: true,
			drinks: "",
			foods: "",
			photo: null,

      errorMessage: "",
      responseOk:false,
      responseStatus:0,
		});
		console.log("States resetados");
	}

	componentDidMount() {
		this._resetStates();
	}

	_cadastraRole(photoURL) {
		fetch("http://roles-events.herokuapp.com/events/", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				owner: this.state.organizer, // Verificar Front-End e Back para decisão sobre este campo
				eventName: this.state.eventName,
				linkReference: "https://" + this.state.linkReference + ".com", // Verificar Front-End e Back para decisão sobre este campo
				organizer: this.state.organizer,
				value: this.state.value,
				address: this.state.address,
				linkAddress: "https://www.google.com/", // Verificar Front-End e Back para decisão sobre este campo
				eventDate: this.state.eventDate,
				eventHour: this.state.eventHour,
				adultOnly: this.state.adultOnly,
				eventDescription: this.state.eventDescription,
				// photo: photoURL,
				foods: this.state.foods,
				drinks: this.state.drinks
			})
		})
			.then(response => {
        this.setState({responseStatus: response.status, responseOk: response.ok})
        console.log(JSON.stringify(response))
				response.json();
			})
			.then(responseJson => {
        console.log("ResponseOk:",this.state.responseOk,'//',"Status:", this.state.responseStatus);
        if((this.state.responseStatus >= 200 && this.state.responseStatus <= 202) && this.state.responseOk){
          console.log("Rolê cadastrado com sucesso!");
          Alert.alert("Parabéns!", "O Rolê foi cadastrado com sucesso!");
          this.setState({ uploading: false, stage: 0 });
          this._resetStates();
          console.log(this.state);
        }else{
          return Promise.reject()
        }
			})
			.catch(error => {
				Alert.alert(
					"Erro "+this.state.responseStatus,
					"Houveram problemas na conexão. Tente novamente mais tarde."
        );
        this.setState({ uploading: false, stage: 0 });
        this._resetStates();
			});
	}

	_stageValidation() {
		const year = date.getFullYear();
		const month =
			date.getMonth() < 10
				? "0" + (date.getMonth() + 1)
				: date.getMonth() + 1;
		const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
		const hour =
			date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
		const minute =
			date.getMinutes() < 10
				? "0" + date.getMinutes()
				: date.getMinutes();

		let blocked = true;

		switch (this.state.stage) {
			case 1:
				if (this.state.eventName == "") {
					Alert.alert("Erro", "Campo de nome do evento inválido!");
				} else if (
					this.state.value == "" ||
					parseFloat(this.state.value) < 0 ||
					isNaN(this.state.value)
				) {
					Alert.alert("Erro", "Campo de valor do ingresso inválido!");
				} else if (this.state.eventDate == "") {
					Alert.alert("Erro", "Campo de data do evento inválido!");
				} else if (this.state.eventHour == "") {
					Alert.alert("Erro", "Campo de hora do evento inválido!");
				} else if (
					this.state.eventDate == `${year}-${month}-${day}` &&
					this.state.eventHour.slice(0, 2) <= hour &&
					this.state.eventHour.slice(3, 5) <= minute
				) {
					Alert.alert("Erro", "Campo de hora do evento inválido!");
				} else {
					this.setState({ stage: 2 });
				}
				return;

			case 2:
				if (this.state.eventDescription == "") {
					Alert.alert(
						"Erro",
						"Campo de descrição do evento inválido!"
					);
				} else if (this.state.drinks == "") {
					Alert.alert("Erro", "Campo de drinks do evento inválido!");
				} else if (this.state.foods == "") {
					Alert.alert("Erro", "Campo de comidas do evento inválido!");
				} else if (this.state.photo == null) {
					Alert.alert("Erro", "Envie uma foto!");
				} else {
					this.setState({ stage: 3 });
				}
				return;

			case 3:
				if (this.state.address == "") {
					Alert.alert("Erro", "Campo de nome do local inválido!");
				} else if (this.state.organizer == "") {
					Alert.alert(
						"Erro",
						"Campo de nome do organizador inválido!"
					);
				} else if (this.state.organizerTel == "") {
					Alert.alert(
						"Erro",
						"Campo de telefone da organização inválido!"
					);
				} else {
					blocked = false;
				}
				break;
		}

		if (blocked === true) {
			Alert.alert(
				"Erro",
				"Seu evento ainda não está pronto para ser criado. Verifique se as informações estão corretas."
			);
		} else {
			this._uploadImage(this.state.photo);
		}
	}

	_handleToggleSwitch() {
		this.setState({ adultOnly: !this.state.adultOnly });
	}

	async datePicker() {
		try {
			const { action, year, month, day } = await DatePickerAndroid.open({
				// Use `new Date()` for current date.
				date: new Date(),
				minDate: new Date()
			});
			if (action !== DatePickerAndroid.dismissedAction) {
				// console.log(year);
				// console.log(month);
				// console.log(day);

				month += 1; //Month goes from 0 to 11, 0 is January
				if (month < 10) month = "0" + month;
				if (day < 10) day = "0" + day;
				this.setState({
					eventDate: year + "-" + month + "-" + day
				});
			}
		} catch ({ code, message }) {
			console.warn("Cannot open date picker", message);
		}
	}

	async timePicker() {
		try {
			const { action, hour, minute } = await TimePickerAndroid.open({
				hour: 0,
				minute: 0,
				is24Hour: true
			});
			if (action !== TimePickerAndroid.dismissedAction) {
				if (hour < 10) hour = "0" + hour;
				if (minute < 10) minute = "0" + minute;
				// console.log(hour);
				// console.log(minute);
				this.setState({
					eventHour: `${hour}:${minute}:00`
				});
			}
		} catch ({ code, message }) {
			console.warn("Cannot open time picker", message);
		}
	}

	_imagePicker = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [1, 1]
		});

		// console.log("Image Picker:" + JSON.stringify(result));

		if (!result.cancelled) {
			this.setState({ photo: result.uri });
			console.log(this.state.photo);
		}
	};

	_toggleModal(modal) {
		modal == "maps" &&
			this.setState({
				mapsModalVisibility: !this.state.mapsModalVisibility
			});
		modal == "image" &&
			this.setState({
				imgModalVisibility: !this.state.imgModalVisibility
			});
	}

	render() {
		let { photo } = this.state;

		if (this.state.stage === 0) {
			return (
				<View
					flex={1}
					backgroundColor="white"
					justifyContent="space-around"
				>
					<H2 style={{ textAlign: "center", marginTop: 30 }}>
						Crie um novo Rolê!
					</H2>
					<Text
						style={{
							textAlign: "center",
							width: "80%",
							alignSelf: "center",
							marginTop: 30,
							fontSize: 15
						}}
					>
						Aconselhamos que você já tenha todos os dados em mãos,
						para que o processo fique rápido.
						{`\n\nClique para iniciar!`}
					</Text>
					<TouchableOpacity
						onPress={() => {
							this.setState({ stage: 1 });
						}}
					>
						<Icon
							type="FontAwesome"
							name="plus-circle"
							style={{
								alignSelf: "center",
								fontSize: 150,
								color: "#1CBD24"
							}}
						/>
					</TouchableOpacity>
				</View>
			);
		} else if (this.state.stage === 1) {
			return (
				<View flex={1} backgroundColor="white">
					<View style={styles.stageIndicator}>
						<Text>1/3</Text>
					</View>
					<View style={styles.container}>
						<View>
							<Text style={styles.questionText}>
								Qual o nome do seu Rolê?
							</Text>
							<CadastroInput
								placeholder="Nome do rolê"
								iconType="MaterialIcons"
								iconName="text-format"
								onChangeText={eventName =>
									this.setState({ eventName })
								}
								value={this.state.eventName}
							/>
						</View>

						<View>
							<Text style={styles.questionText}>
								Quanto Custam os ingressos?
							</Text>
							<CadastroInput
								placeholder="Valor"
								iconType="Foundation"
								iconName="ticket"
								onChangeText={value => this.setState({ value })}
								keyboardType="numeric"
								value={this.state.value}
							/>
						</View>

						<View>
							<Text style={styles.questionText}>
								Que dia e que horas vai começar?
							</Text>
							<View style={styles.inputContainer}>
								<View
									flexDirection="row"
									justifyContent="center"
								>
									<TouchableOpacity
										style={styles.dateTimePicker}
										onPress={() => this.datePicker()}
									>
										<Icon
											type="FontAwesome"
											name="calendar-check-o"
											style={{
												fontSize: 25,
												marginTop: 15
											}}
										/>
										<Text>
											{this.state.eventDate || "Data"}
										</Text>
									</TouchableOpacity>
								</View>

								<View>
									<TouchableOpacity
										style={styles.dateTimePicker}
										onPress={() => this.timePicker()}
									>
										<Icon
											type="Feather"
											name="clock"
											style={{
												fontSize: 25,
												marginTop: 15
											}}
										/>
										<Text>
											{this.state.eventHour || "Horário"}
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>

						<View>
							<Text style={styles.questionText}>
								É permitido para menores de 18 anos?
							</Text>
							<View
								flexDirection="row"
								justifyContent="space-around"
								alignSelf="center"
								width={100}
								marginTop={10}
							>
								<Image
									source={eighteen}
									style={{ height: 30, width: 30 }}
								/>
								<Switch
									onValueChange={() =>
										this._handleToggleSwitch()
									}
									value={this.state.adultOnly}
								/>
							</View>
						</View>
						<Button
							block
							style={styles.pageBtn}
							onPress={() => this._stageValidation()}
						>
							<Text style={{ color: "white" }}>Próximo</Text>
						</Button>
					</View>
				</View>
			);
		} else if (this.state.stage === 2) {
			return (
				<View flex={1} backgroundColor="white">
					<ImageModal
						visible={this.state.imgModalVisibility}
						closeModal={() => this._toggleModal("image")}
						photoSrc={photo}
						editBtn={() => this._imagePicker()}
					/>
					<View style={styles.stageIndicator}>
						<Text>2/3</Text>
					</View>
					<View style={styles.container}>
						<View>
							<Text style={styles.questionText}>
								Dê uma descrição detalhada do seu rolê
							</Text>
							<CadastroInput
								placeholder="Descrição"
								iconType="Feather"
								iconName="file-text"
								onChangeText={eventDescription =>
									this.setState({ eventDescription })
								}
								value={this.state.eventDescription}
							/>
						</View>

						<View>
							<Text style={styles.questionText}>
								O que vai ter pra comer e beber?
							</Text>
							<View>
								<CadastroInput
									placeholder="Drinks"
									iconType="Entypo"
									iconName="drink"
									onChangeText={drinks =>
										this.setState({ drinks })
									}
									value={this.state.drinks}
								/>
								<CadastroInput
									placeholder="Comidas"
									iconType="MaterialCommunityIcons"
									iconName="food"
									onChangeText={foods =>
										this.setState({ foods })
									}
									value={this.state.foods}
								/>
							</View>
						</View>

						<View>
							<Text style={styles.questionText}>
								Qual imagem será usada para divulgação do
								evento?
							</Text>

							{photo == null ? (
								<Button
									bordered
									dark
									block
									style={styles.imageUploadBtn}
									onPress={() => this._imagePicker()}
								>
									<Icon
										type="Feather"
										name="upload"
										style={{ color: "black" }}
									/>
									<Text>Enviar foto do evento</Text>
								</Button>
							) : (
								<Button
									block
									style={styles.imageModalBtn}
									onPress={() => this._toggleModal("image")}
								>
									<Icon
										type="FontAwesome"
										name="image"
										style={{ color: "white" }}
									/>
									<Text style={{ color: "white" }}>
										Visualizar/Editar imagem enviada
									</Text>
								</Button>
							)}
						</View>

						<View style={styles.doublePageBtn}>
							<Button
								block
								style={{
									width: "50%",
									backgroundColor: "#08700D"
								}}
								onPress={() => this.setState({ stage: 1 })}
							>
								<Text style={{ color: "white" }}>Voltar</Text>
							</Button>
							<Button
								block
								style={{
									width: "50%",
									backgroundColor: "#1CBD24"
								}}
								onPress={() => this._stageValidation()}
							>
								<Text style={{ color: "white" }}>Próximo</Text>
							</Button>
						</View>
					</View>
				</View>
			);
		} else if (this.state.stage === 3) {
			return this.state.uploading === true ? (
				<View flex={1} justifyContent="center" alignContent="center">
					<Text style={{ textAlign: "center" }}>
						Cadastrando rolê... {"\n"}
					</Text>
					<ActivityIndicator alignSelf="center" size="large" />
				</View>
			) : (
				<View flex={1} backgroundColor="white">
					<MapsModal
						visible={this.state.mapsModalVisibility}
						closeModal={() => this._toggleModal("maps")}
						// address = {address => this.state.address}
					/>
					<View style={styles.stageIndicator}>
						<Text>3/3</Text>
					</View>
					<View style={styles.container}>
						<View>
							<Text style={styles.questionText}>
								Existe algum link nas redes sociais?
							</Text>
							<CadastroInput
								placeholder="Link de referência"
								iconType="Feather"
								iconName="link"
								onChangeText={linkReference =>
									this.setState({ linkReference })
								}
								value={this.state.linkReference}
							/>
						</View>

						<View>
							<Text style={styles.questionText}>
								Onde vai ser o seu evento?
							</Text>
							<CadastroInput
								placeholder="Nome do Local"
								iconType="MaterialIcons"
								iconName="place"
								onChangeText={address =>
									this.setState({ address })
								}
								value={this.state.address}
							/>
							{/* Espaçamento */}
							<View style={{ height: 10 }} />
							{/* ----------- */}
							<Button
								block
								bordered
								dark
								style={{
									width: "80%",
									marginTop: 10,
									alignSelf: "center",
									borderRadius: 10
								}}
								onPress={() => this._toggleModal("maps")}
							>
								<Icon
									type="MaterialIcons"
									style={{ color: "black" }}
									name="gps-fixed"
								/>
								<Text>Definir Localização</Text>
							</Button>
						</View>

						<View>
							<Text style={styles.questionText}>
								Com quem seu público fala pra tirar dúvidas?
							</Text>
							<CadastroInput
								placeholder="Nome para Contato"
								iconType="MaterialIcons"
								iconName="person"
								onChangeText={organizer =>
									this.setState({ organizer })
								}
								value={this.state.organizer}
							/>
							{/* Espaçamento */}
							<View style={{ height: 10 }} />
							{/* ----------- */}
							<CadastroInput
								placeholder="Telefone para Contato"
								iconType="FontAwesome"
								iconName="phone"
								onChangeText={organizerTel =>
									this.setState({ organizerTel })
								}
								value={this.state.organizerTel}
								keyboardType="phone-pad"
							/>
						</View>

						<View style={styles.doublePageBtn}>
							<Button
								block
								style={{
									width: "50%",
									backgroundColor: "#08700D"
								}}
								onPress={() => this.setState({ stage: 2 })}
							>
								<Text style={{ color: "white" }}>Voltar</Text>
							</Button>
							<Button
								block
								style={{
									width: "50%",
									backgroundColor: "#1CBD24"
								}}
								onPress={() => this._stageValidation()}
							>
								<Text style={{ color: "white" }}>Concluir</Text>
							</Button>
						</View>
					</View>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: "center",
		backgroundColor: "white",
		justifyContent: "space-between"
	},
	inputContainer: {
		width: "80%",
		alignSelf: "center",
		justifyContent: "space-around",
		alignItems: "center",
		flexDirection: "row",
		marginTop: 10
	},
	pageBtn: {
		width: "100%",
		backgroundColor: "#1CBD24",
		alignSelf: "center",
		borderRadius: 0
	},
	doublePageBtn: {
		flexDirection: "row",
		width: "100%",
		alignSelf: "center",
		backgroundColor: "green"
	},
	stageIndicator: {
		alignSelf: "center",
		width: 50,
		backgroundColor: "rgba(0,0,0,0.07)",
		alignItems: "center",
		borderRadius: 10,
		margin: 5
	},
	questionText: {
		textAlign: "center",
		fontWeight: "bold",
		width: "70%",
		alignSelf: "center"
	},
	dateTimePicker: {
		borderBottomWidth: 1,
		borderColor: "lightgrey",
		minWidth: "40%",
		justifyContent: "center",
		alignItems: "center"
	},
	imageUploadBtn: {
		width: "80%",
		borderRadius: 10,
		alignSelf: "center",
		marginTop: 10
	},
	imageModalBtn: {
		width: "80%",
		borderRadius: 10,
		alignSelf: "center",
		marginTop: 10,
		backgroundColor: "#08700D"
	}
});
