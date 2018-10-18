import React, { Component } from "react"
import {
	Card,
	CardItem,
	Left,
	Thumbnail,
	Body,
	Right,
	Icon,
	H2,
	List,
	ListItem
} from "native-base"
import { Text, StyleSheet } from "react-native"

const adultOnly = require("../../../static/adultOnly.png")
const noPic = require("../../../static/noPic.png")

class Geral extends Component {
	render() {
		const uri = this.props.photo
		return (
			<Card>
				<Text style={{ color: "grey" }}>Geral</Text>
				<CardItem>
					<Left>
						<Thumbnail
							style={styles.thumbnailGeral}
							source={this.props.photo == null ? noPic : {uri: uri}}
						/>
					</Left>

					<Body>
						<H2
							style={{
								textAlign: "center",
								alignSelf: "center"
							}}
						>
							{this.props.eventName}
						</H2>

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
					<Card transparent>
						<Body>
							<CardItem>
								<Text>Classificação Indicativa:</Text>
								<Thumbnail
									style={{ marginLeft: 20 }}
									small
									source={adultOnly}
								/>
							</CardItem>
						</Body>
					</Card>
				)}
			</Card>
		)
	}
}

const styles = StyleSheet.create({
	descCards: {
		flexDirection: "row"
	},
	thumbnailGeral: {
		borderWidth: 2,
		borderColor: "grey",
		borderRadius: 125,
		width: 125,
		height: 125
	}
})

export default Geral
