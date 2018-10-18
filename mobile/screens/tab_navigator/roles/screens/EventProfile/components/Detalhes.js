import React, { Component } from "react"
import { Card, CardItem, Body, Icon, Button } from "native-base"
import {
	ScrollView,
	Text,
	StyleSheet,
	TouchableOpacity,
	Linking,
	View,
	TouchableHighlight
} from "react-native"
import Modal from "react-native-modal"

class Detalhes extends Component {
	_gotoURL = () => {
		Linking.openURL(this.props.refURL)
	}

	state = {
		modalVisible: false
	}

	_toggleModal = () => {
		this.setState({ modalVisible: !this.state.modalVisible })
	}

	render() {
		return (
			<View>
				<Modal
					isVisible={this.state.modalVisible}
					onBackButtonPress={this._toggleModal}
					onBackdropPress={this._toggleModal}
				>
					<Card style={styles.modalDescricao}>
						<CardItem
							header
							bordered
							style={{ height: 50, alignSelf: "center" }}
						>
							<Icon name="clipboard" />
							<Text> Descrição do Rolê</Text>
						</CardItem>

						<ScrollView
							style={{
								height: "60%",
								backgroundColor: "#f2f2f2"
							}}
						>
							<Text style={{ textAlign: "center" }}>
								{"\n" + this.props.eventDescription + "\n"}
							</Text>
						</ScrollView>

						<CardItem style={{ alignSelf: "center" }}>
							<Icon name="link" />
							<Text>Link: </Text>
							<TouchableOpacity onPress={this._gotoURL}>
								<Text style={{ color: "blue" }}>
									{this.props.refURL}
								</Text>
							</TouchableOpacity>
						</CardItem>
					</Card>
				</Modal>

				<Card>
					<Text style={{ color: "grey" }}>Detalhes</Text>
					<Body>
						<TouchableOpacity onPress={this._toggleModal}>
							<Card
								style={{
									alignSelf: "center",
									width: 300
								}}
							>
								<CardItem
									style={{
										backgroundColor: "#f2f2f2",
										height: 100
									}}
								>
									<Text>{this.props.eventDescription}</Text>
								</CardItem>

								<CardItem
									bordered
									style={{ alignSelf: "center" }}
								>
									<Icon name="clipboard" />
									<Text>Descrição do Rolê - </Text>
									<Text style={{color:'blue'}}>Ver Mais</Text>
								</CardItem>
							</Card>
						</TouchableOpacity>

						<Button
							block
							style={styles.btnDrinks}
						>
							<Icon name="beer" />
							<Text style={{ color: "white" }}>Drinks</Text>
						</Button>
						<Button block danger style={styles.btn}>
							<Icon name="pizza" />
							<Text style={{ color: "white" }}>Comidas</Text>
						</Button>
					</Body>
				</Card>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	descricaoRole: {
		backgroundColor: "#e5e5e5",
		width: 300,
		height: 100,
		borderWidth: 2,
		borderColor: "grey"
	},
	btn: {
		margin: 7,
		marginBottom: 10,
		width: 300,
		alignSelf: "center"
	},
	btnDrinks: {
		margin: 7,
		marginBottom: 10,
		width: 300,
		alignSelf: "center",
		backgroundColor: '#eabb00',
	},
	modalDescricao: {
		width: "90%",
		alignSelf: "center",
		borderRadius: 10
	}
})

export default Detalhes
