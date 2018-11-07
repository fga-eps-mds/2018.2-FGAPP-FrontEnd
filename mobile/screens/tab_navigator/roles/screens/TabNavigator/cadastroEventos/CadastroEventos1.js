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
	Switch
} from "react-native";
import { Icon, TextInput, Button, H2, Item, Input } from "native-base";
import CadastroInput from "./components/CadastroInput/index.js";

const eighteen = require("../../../static/eighteen.png");

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: "center",
		backgroundColor: "white",
		justifyContent: "space-around"
  },
	inputContainer: {
		width: "80%",
		alignSelf: "center",
		justifyContent: "space-around",
		alignItems: "center",
		flexDirection: "row",
		marginTop: 10
  },
  nextBtn:{
    width:'80%',
    backgroundColor:'#1CBD24',
    alignSelf:'center',
    borderRadius: 10
  }
});

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
		adultOnly: false,
		drinks: "",
		foods: "",
		photo: null,

		stage: 0,
		switchValue: true
	};

	_handleToggleSwitch() {
		this.setState({ switchValue: !this.state.switchValue });
	}

	render() {
		if (this.state.stage === 0) {
			return (
				<View style={styles.container}>
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
						Aconselhamos que você já tenha todos os dados em mãos, para que o
						processo fique rápido.
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
								marginTop: 80,
								color: "#1CBD24"
							}}
						/>
					</TouchableOpacity>
				</View>
			);
		} else if (this.state.stage === 1) {
			return (
				<View style={styles.container}>
					<View>
						<Text style={{ textAlign: "center", fontWeight:'bold' }}>
							Qual o nome do seu Rolê?
						</Text>
						<CadastroInput
							placeholder="Nome do rolê"
							iconType="MaterialIcons"
							iconName="text-format"
						/>
					</View>

					<View>
						<Text style={{ textAlign: "center", marginTop: 25, fontWeight:'bold' }}>
							Quanto Custam os ingressos?
						</Text>
						<CadastroInput
							placeholder="Valor do Ingresso"
							iconType="Foundation"
							iconName="ticket"
						/>
					</View>

					<View>
						<Text style={{ textAlign: "center", marginTop: 25, fontWeight:'bold' }}>
							Que dia e que horas vai começar?
						</Text>
						<View style={styles.inputContainer}>
							<Icon
								type="FontAwesome"
								name="calendar-check-o"
								style={{ fontSize: 25, marginTop: 15 }}
							/>
							<Item style={{ width: "30%" }}>
								<Input
									placeholder="Data"
									style={{ textAlign: "center", fontSize: 15 }}
								/>
							</Item>

							<Icon
								type="Feather"
								name="clock"
								style={{ fontSize: 25, marginTop: 15 }}
							/>
							<Item style={{ width: "30%" }}>
								<Input
									placeholder="Hora"
									style={{ textAlign: "center", fontSize: 15 }}
								/>
							</Item>
						</View>
					</View>

					<View>
						<Text style={{ textAlign: "center", marginTop: 25, fontWeight:'bold' }}>
							É permitido para menores de 18 anos?
						</Text>
						<View
							flexDirection="row"
							justifyContent="space-around"
							alignSelf="center"
							width={100}
						>
							<Image source={eighteen} style={{ height: 30, width: 30 }} />
							<Switch
								onValueChange={() => this._handleToggleSwitch()}
								value={this.state.switchValue}
							/>
						</View>
					</View>

          <Button block style={styles.nextBtn}>
            <Text style={{color:'white'}}>Próximo</Text>
          </Button>
				</View>
			);
		}
	}
}
