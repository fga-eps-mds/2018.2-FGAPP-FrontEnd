import {
	Body,
	Button,
	Icon,
	Card,
	CardItem,
	Text,
	Thumbnail,
	Left,
	Right,
	Row,
	Item
} from "native-base";

import React, { Component } from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import LikeButton from "./components/LikeButton";

const noPic = require("../../../static/noPic.png");

class FeedItem extends Component {
	goToComments = () => {
		this.props.navigate.navigation("Comments");
	};

	render() {
		const uri = this.props.imgRole;
		const dataFormatada =
			this.props.eventDate.slice(-2) +
			"/" +
			this.props.eventDate.slice(5, 7) +
			"/" +
			this.props.eventDate.slice(0, 4);
		return (
			<Card style={styles.mb}>
				<TouchableOpacity
					onPress={() => {
						console.log(
							"Profile -> " + this.props.nomeRole + "/" + this.props.idRole
						);
						this.props.navigation.navigate("Profile", {
							idRole: this.props.idRole
						});
					}}
				>
					<View pointerEvents="none">
						<CardItem>
							<Left>
								<Thumbnail
									style={{
										borderWidth: 1,
										borderColor: "grey",
										borderRadius: 125,
										width: 140,
										height: 140
									}}
									large
									source={
										this.props.imgRole == null //Se o valor de imgRole for null
											? noPic //então exibe imagem "noPic.png"
											: { uri: uri } //caso contrário, exibe a imagem
									}
								/>
								<Body>
									<Text
										style={{
											fontWeight: "bold",
											fontSize: 30,
											textAlign: "center"
										}}
									>
										{this.props.nomeRole}
									</Text>
									<Text style={{ textAlign: "center" }} note>
										{this.props.org}
									</Text>
									<View flexDirection="row" alignSelf="center">
										<Icon
											type="MaterialCommunityIcons"
											name="calendar-blank"
											color="gray"
										/>
										<Text
											style={{
												textAlign: "center",
												marginLeft: 5,
												textAlignVertical: "center"
											}}
											note
										>
											{dataFormatada}
										</Text>
									</View>
								</Body>
							</Left>
						</CardItem>
					</View>
				</TouchableOpacity>

				<CardItem style={{ paddingVertical: 0 }}>
					<Button
						transparent
						onPress={() => {
							console.log("Likes -> " + this.props.nomeRole);
						}}
					>
						<LikeButton />
						<Text>11 Likes</Text>
					</Button>

					<Button
						transparent
						onPress={() => {
							this.props.navigation.navigate("Comments", {
								idRole: this.props.idRole
							});
						}}
					>
						<Icon active name="chatbubbles" />

						<Text style={{ textAlign: "center" }}>8 Comentários</Text>
					</Button>
				</CardItem>
			</Card>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: "#FFF"
	},
	mb: {
		marginBottom: 15
	},
	cardBtn: {
		width: 100
	}
});

export default withNavigation(FeedItem);
