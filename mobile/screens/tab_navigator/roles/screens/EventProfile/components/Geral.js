import React, { Component } from "react";
import {
	Card,
	CardItem,
	Left,
	Thumbnail,
	Body,
	H2,
} from "native-base";
import { Text, StyleSheet } from "react-native";
import Divider from "./Divider";
import GeralDetails from "./GeralDetails";
import * as helpers from '../../../utils/helpers';

const noPic = require("../../../static/noPic.png");
const adultOnly = require("../../../static/adultOnly.png");

class Geral extends Component {
	render() {
		const uri = this.props.photo;
		return (
			<Card>
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
            
            <GeralDetails iconName="time" text={`${this.props.eventHour.slice(0,5)}h`}/>

            <GeralDetails iconName="calendar" text={ helpers.formatDate(this.props.eventDate).formatted }/>

            <GeralDetails iconName="cash" text={ `R$ ${this.props.value}` }/>

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
