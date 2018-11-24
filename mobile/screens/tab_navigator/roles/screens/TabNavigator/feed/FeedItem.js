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
import * as helpers from "../../../utils/helpers";

const noPic = require("../../../static/noPic.png");

class FeedItem extends Component {
	render() {
		const uri = this.props.imgRole;
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
											{helpers.formatDate(this.props.eventDate).formatted}
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
						<LikeButton likeText="LIKE" />
					</Button>

					<Button
						style={{ paddingLeft: "20%" }}
						transparent
						onPress={() => {
							this.props.navigation.navigate("Comments", {
								idRole: this.props.idRole,
								eventName: this.props.nomeRole
							});
						}}
					>
						<Icon active name="chatbubbles" style={{ color: "gray" }} />
						<Text
							style={{ textAlign: "center", color: "gray", fontWeight: "bold" }}
						>
							Comentários
						</Text>
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
