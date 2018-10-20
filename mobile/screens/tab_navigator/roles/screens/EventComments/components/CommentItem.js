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
            <View>
                <Text>{this.props.idComment}</Text>
            </View>
        )
    }
}

export default CommentItem