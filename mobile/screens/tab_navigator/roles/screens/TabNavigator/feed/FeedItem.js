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
import {withNavigation} from 'react-navigation'
import LikeButton from "./components/LikeButton";

<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
import Comments from '../../EventComments/Comments';

>>>>>>> origin/roles-app/event-comments
// const logo = require("./images/logo.png");
>>>>>>> origin/roles-app/event-profile
const noPic = require("../../../static/noPic.png")

class FeedItem extends Component {

	goToComments = () => {
		this.props.navigate.navigation('Comments')
	}

	render() {
		const uri = this.props.imgRole
		return (
			<Card style={styles.mb}>
				<TouchableOpacity
					onPress={() => {
						console.log("Profile -> " + this.props.nomeRole + "/" + this.props.idRole)
						this.props.navigation.navigate('Profile', {idRole: this.props.idRole})
					}}
				>
					<View pointerEvents="none">
						<CardItem>
							<Left>
								<Icon type="FontAwesome" name="calendar" />
								<Body>
									<Text>{this.props.nomeRole}</Text>
									<Text note>{this.props.org}</Text>
								</Body>
							</Left>
						</CardItem>

						<CardItem cardBody>
							<Image
								style={{
									resizeMode: "cover",
									width: null,
									height: 200,
									flex: 1
								}}
								source={
									this.props.imgRole == null //Se o valor de imgRole for null
										? noPic //então exibe imagem "noPic.png"
										: {uri: uri} //caso contrário, exibe a imagem
								}
							/>
						</CardItem>
					</View>
				</TouchableOpacity>

				<CardItem style={{ paddingVertical: 0 }}>
					<Button
						transparent
						onPress={() => {
							console.log("Likes -> " + this.props.nomeRole)
						}}
					>
						<LikeButton/>
						<Text>11 Likes</Text>
					</Button>

					<Button
						transparent
						onPress={() => {
							this.props.navigation.navigate('Comments', {idRole: this.props.idRole})
						}}
					>
						<Icon active name="chatbubbles" />

						<Text style={{ textAlign: "center" }}>
							8 Comentários
						</Text>
					</Button>
				</CardItem>
			</Card>
		)
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
})

export default withNavigation(FeedItem)