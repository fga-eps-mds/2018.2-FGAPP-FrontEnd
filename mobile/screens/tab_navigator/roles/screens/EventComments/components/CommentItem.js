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
} from "native-base"
import React, { Component } from "react"
import { StyleSheet, Image, View, TouchableOpacity } from "react-native"

class CommentItem extends Component {
	render() {
		return (
			<Card>
				<CardItem>
					<Icon name="person" />
					<Card style={{ width: "100%" }} transparent>
						<Text style={{ fontWeight: "bold" }}>
							{this.props.author}
						</Text>
						<Text>{this.props.comment}</Text>
					</Card>
				</CardItem>
			</Card>
		)
	}
}

export default CommentItem
