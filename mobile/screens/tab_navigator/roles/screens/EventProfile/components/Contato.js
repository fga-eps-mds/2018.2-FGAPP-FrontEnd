import React, { Component } from "react"
import {
	Card,
	CardItem,
	Icon,
} from "native-base"
import {
	ScrollView,
	Text,
	StyleSheet,
} from "react-native"

class Contato extends Component {
	render() {
		return (
			<Card>
				<Text style={{ color: "grey" }}>Suporte</Text>
				<CardItem>
					<ScrollView style={styles.descricaoRole}>
						<Text style={{ textAlign: "center" }}>
							FAQ E SUPORTE
						</Text>
					</ScrollView>
				</CardItem>

				<CardItem>
					<Card style={{ width: 320, alignSelf: "center" }}>
						<Text style={{ color: "grey", fontSize: 10 }}>
							Contato
						</Text>
						<CardItem style={{ paddingTop: 5 }}>
							<Icon name="contact" style={styles.contactIcon} />
							<Card transparent style={{ marginLeft: 10 }}>
								<Text style={{ fontWeight: "bold" }}>
									{this.props.organizer}
								</Text>
								<Text>{this.props.organizerTel}</Text>
							</Card>
						</CardItem>
					</Card>
				</CardItem>
			</Card>
		)
	}
}

const styles = StyleSheet.create({
	descricaoRole: {
		backgroundColor: "#e5e5e5",
		width: 300,
		height: 200,
		alignSelf: "center",
		borderWidth: 2,
		borderColor: "grey"
	},
	contactIcon:{
		width:50, 
		fontSize: 50, 
		color: "#014421",
	}
})

export default Contato