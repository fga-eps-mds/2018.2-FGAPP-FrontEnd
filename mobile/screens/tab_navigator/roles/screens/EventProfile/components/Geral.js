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
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	Alert
} from "react-native"
import Divider from "./Divider"
import CardHeader from "./CardHeader"
import PicModal from "./PicModal"
import Modal from "react-native-modal"
import ImageView from "react-native-image-view"

const adultOnly = require("../../../static/adultOnly.png")
const noPic = require("../../../static/noPic.png")

class Geral extends Component {
	state = {
		picModalVisible: false
	}

	_toggleModal = () => {
		this.props.photo != null
			? this.setState({ picModalVisible: !this.state.picModalVisible })
			: Alert.alert("Aviso", "Não há foto disponível para este rolê.")
	}

	render() {
		const uri = this.props.photo
		const dataFormatada =
			this.props.eventDate.slice(-2) +
			"/" +
			this.props.eventDate.slice(5, 7) +
			"/" +
			this.props.eventDate.slice(0, 4)
		const images = [
			{
				source: { uri: uri },
				title: "Foto do Rolê"
			}
		]
		return (
			<View>
				<ImageView
					images={images}
					imageIndex={0}
					isVisible={this.state.picModalVisible}
					animationType="fade"
				/>

				<Card>
					<CardHeader text="Geral" />
					<CardItem>
						<Left>
							<TouchableOpacity
								onPress={() => {
									this._toggleModal()
								}}
							>
								<Thumbnail
									style={styles.thumbnailGeral}
									source={
										this.props.photo == null
											? noPic
											: { uri: uri }
									}
								/>
							</TouchableOpacity>
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
									<Text>
										{this.props.eventHour.slice(0, 5)}h
									</Text>
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
			</View>
		)
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
	},
	footerPhotoModal: {
		// color: "white",
		width: "100%",
		textAlign: "center"
	}
})

export default Geral
