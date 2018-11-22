import React, { Component } from "react";
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
} from "native-base";
import { Text, StyleSheet } from "react-native";
import Divider from "./Divider";
import CardHeader from "./CardHeader";

const noPic = require("../../../static/noPic.png");
const adultOnly = require("../../../static/adultOnly.png");

class Geral extends Component {
	render() {
		const uri = this.props.photo;
		const dataFormatada =
			this.props.eventDate.slice(-2) +
			"/" +
			this.props.eventDate.slice(5, 7) +
			"/" +
			this.props.eventDate.slice(0, 4);
		return (
			<Card>
				<CardHeader text="Geral" />
				<CardItem>
					<Left>
						<Thumbnail
							style={styles.thumbnailGeral}
							source={this.props.photo == null ? noPic : { uri: uri }}
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

						<Divider />

						<Card style={styles.descCards}>
							<Left>
								<Icon name="time" />
							</Left>
							<Right>
								<Text>{this.props.eventHour.slice(0, 5)}h</Text>
							</Right>
						</Card>

						<Card style={styles.descCards}>
							<Left>
								<Icon name="calendar" />
							</Left>
							<Right>
								<Text>{dataFormatada}</Text>
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
		);
	}
}

const styles = StyleSheet.create({
	descCards: {
		flexDirection: "row"
	},
	thumbnailGeral: {
		borderWidth: 1,
		borderColor: "grey",
		borderRadius: 125,
		width: 140,
		height: 140
	}
});

export default Geral;
