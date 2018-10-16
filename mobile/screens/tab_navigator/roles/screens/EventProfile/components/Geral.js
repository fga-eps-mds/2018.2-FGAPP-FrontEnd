import React, { Component } from "react"
import {
	Card,
	CardItem,
	Left,
	Thumbnail,
	Body,
	Right,
	Icon,
} from "native-base"
import { View, ScrollView, Text, StyleSheet } from "react-native"

const noPic = require("../../TabNavigator/feed/images/noPic.png")

class Geral extends Component {
	render() {
		return (
			<Card>
				<Text style={{ color: "grey" }}>Geral</Text>
				<CardItem>
					<Left>
						<Thumbnail
							style={styles.thumbnailDescricao}
							source={noPic}
						/>
					</Left>

					<Body>
						<Text
							style={{
								fontSize: 20,
								textAlign: "center",
								alignSelf: "center"
							}}
						>
							{this.props.eventName}
						</Text>

						<Card style={styles.descCards}>
							<Left>
								<Icon name="time" />
							</Left>
							<Right>
								<Text>{this.props.eventHour}</Text>
							</Right>
						</Card>

						<Card style={styles.descCards}>
							<Left>
								<Icon name="calendar" />
							</Left>
							<Right>
								<Text>{this.props.eventDate}</Text>
							</Right>
						</Card>

						<Card style={styles.descCards}>
							<Left>
								<Icon name="cash" />
							</Left>
							<Right>
								<Text>R$ {this.props.value}</Text>
							</Right>
						</Card>
					</Body>
				</CardItem>

				{/* Sessão do +18; Se for true, ele mostra o card dizendo que a classificação indicativa é +18 */}
				{this.props.adultOnly == true && (
					<Left>
						<Card>
							<Body>
								<CardItem>
									<Text>Classificação Indicativa: </Text>
								</CardItem>
								<CardItem>
									<Thumbnail small source={noPic} />
								</CardItem>
							</Body>
						</Card>
					</Left>
				)}
			</Card>
		)
	}
}

const styles = StyleSheet.create({
	descCards: {
		flexDirection: "row"
	},
	thumbnailDescricao: {
		borderWidth: 2,
		borderColor: "grey",
		borderRadius: 125,
		width: 125,
		height: 125
	}
})

export default Geral
