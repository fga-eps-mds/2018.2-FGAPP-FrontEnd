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
import {
	StyleSheet,
	Image,
	View,
	TouchableOpacity,
	ScrollView
} from "react-native";
import Divider from "../../EventProfile/components/Divider";
import LikeButton from "./LikeButton";

class CommentItem extends Component {
	render() {
		return (
			<View>
				<Card transparent>
					<CardItem>
						<View
							style={{ alignSelf: "flex-start", alignContent: "flex-start" }}
						>
							<Icon name="person" />
						</View>
						<View style={{ width: "100%" }}>
							<View>
								<Text style={{ fontWeight: "bold", marginBottom: 10 }}>{this.props.author}</Text>

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
		);
	}
}

export default CommentItem;
