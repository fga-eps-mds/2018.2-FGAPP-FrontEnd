import React, { Component } from "react"
import {
	Card,
	CardItem,
	Body,
	Icon,
	Button
} from "native-base"
import {
	View,
	ScrollView,
	Text,
	StyleSheet,
	Linking,
	TouchableOpacity
} from "react-native"

class Descricao extends Component {
	render() {
		return (
			<Card>
				<Text style={{ color: "grey" }}>Detalhes</Text>
				<CardItem>
					<Body>
						<ScrollView style={styles.descricaoRole}>
							<Text style={{ textAlign: "center" }}>
								{this.props.eventDescription}
							</Text>
						</ScrollView>
					</Body>
				</CardItem>

				<CardItem style={{ alignSelf: "center" }}>
					<Icon name="link" />
					<Text>Link: </Text>
					<TouchableOpacity onPress={this._gotoURL}>
						<Text style={{ color: "blue" }}>
							{this.props.linkAddress}
						</Text>
					</TouchableOpacity>
				</CardItem>
				<Button block style={styles.btn}>
					<Icon name="beer" />
					<Text style={{ color: "white" }}>Drinks</Text>
				</Button>
				<Button block danger style={styles.btn}>
					<Icon name="pizza" />
					<Text style={{ color: "white" }}>Comidas</Text>
				</Button>
			</Card>
		)
	}
}

const styles = StyleSheet.create({
	descricaoRole: {
		backgroundColor: "#e5e5e5",
		width: 300,
		height: 200,
		alignSelf: "center"
	},
	btn: {
		margin: 7
	}
})

export default Descricao
