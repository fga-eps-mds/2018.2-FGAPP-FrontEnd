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
	Item,
	ActionSheet,
	Root
} from "native-base";
import React, { Component } from "react";
import {
	StyleSheet,
	Image,
	View,
	TouchableOpacity,
	ScrollView
} from "react-native";
import Divider from "../../EventProfile/components/Divider";
import LikeButton from "./LikeButton";

var BUTTONS = [
	{ text: "Responder", icon: "quote", iconColor: "#2c8ef4" },
	{ text: "Editar", icon: "hammer", iconColor: "#f42ced" },
	{ text: "Delete", icon: "trash", iconColor: "#fa213b" },
	{ text: "Cancel", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX = 2;
var CANCEL_INDEX = 3;

class CommentItem extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Root>
				<View>
					<Card transparent>
						<CardItem>
							<View
								style={{
									alignSelf: "flex-start",
									alignContent: "flex-start",
									paddingTop: 15
								}}
							>
								<Icon name="person" />
							</View>
							<View style={{ width: "100%" }}>
								<View flex={1}>
									<View
										style={{
											flexDirection: "row",
											alignContent: "space-between",
											width: "80%",
											justifyContent: "space-between"
										}}
									>
										<Text
											style={{
												fontWeight: "bold",
												textAlignVertical: "center"
											}}
										>
											{this.props.author}
										</Text>
										<Button
											style={{}}
											transparent
											onPress={() =>
												ActionSheet.show(
													{
														options: BUTTONS,
														cancelButtonIndex: CANCEL_INDEX,
														destructiveButtonIndex: DESTRUCTIVE_INDEX,
														title: "Comentário de " + this.props.author
													},
													buttonIndex => {
														this.setState({ clicked: BUTTONS[buttonIndex] });
													}
												)
											}
										>
											<Icon name="more" />
										</Button>
									</View>

									<Text>{this.props.text}</Text>

									<Text style={{ color: "grey", fontSize: 12 }}>
										Postado em: {this.props.postDate}
									</Text>
									{this.props.modifyDate != null && (
										<Text style={{ color: "grey", fontSize: 12 }}>
											Modificado em: {this.props.modifyDate}
										</Text>
									)}
								</View>
								<LikeButton />
							</View>
						</CardItem>
					</Card>

					<Divider size="80%" />
				</View>
			</Root>
		);
	}
}

export default CommentItem;
