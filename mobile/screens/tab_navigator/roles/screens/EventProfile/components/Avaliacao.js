import React, { Component } from "react"
import {
	Card,
	CardItem,
	Left,
	Body,
	Right,
	List,
	ListItem,
	Icon,
	Button
} from "native-base"
import {
	View,
	ScrollView,
	Text,
	StyleSheet,
	Linking,
	TouchableOpacity
} from "react-native"

import Divider from './Divider'
import CardHeader from './CardHeader'

class Avaliacao extends Component {
	state = {
		thumbsUp: false,
		thumbsDown: false
	}

	_toggleThumbs(thumbs) {
		if (thumbs == "up") {
			if (this.state.thumbsDown)
				this.setState({ thumbsDown: !this.state.thumbsDown })
			this.setState({ thumbsUp: !this.state.thumbsUp })
		} else if (thumbs == "down") {
			if (this.state.thumbsUp)
				this.setState({ thumbsUp: !this.state.thumbsUp })
			this.setState({ thumbsDown: !this.state.thumbsDown })
		}
	}

	render() {
		return (
			<Card>
				<CardHeader text="Avaliação"/>
				<Body>
					<Card transparent style={styles.subCards}>
						<Text style={styles.subHeaders}>
							Como está o evento?
						</Text>

						<CardItem style={{ alignSelf: "center", marginBottom:-30}}>
							<Left>
								<TouchableOpacity
									onPress={() => this._toggleThumbs("up")}
								>
									<Icon
										name="thumbs-up"
										style={{
											fontSize: 40,
											color: this.state.thumbsUp
												? "green"
												: "black"
										}}
									/>
								</TouchableOpacity>

								<Text style={styles.likeDislikeBox}>11</Text>
							</Left>

							<Right>
								<CardItem>
									<Text style={styles.likeDislikeBox}>4</Text>
									<TouchableOpacity
										onPress={() =>
											this._toggleThumbs("down")
										}
									>
										<Icon
											name="thumbs-down"
											style={{
												fontSize: 40,
												color: this.state.thumbsDown
													? "red"
													: "black"
											}}
										/>
									</TouchableOpacity>
								</CardItem>
							</Right>
						</CardItem>
					</Card>
				</Body>
			</Card>
		)
	}
}

const styles = StyleSheet.create({
	likeDislikeBox: {
		borderWidth: 1,
		borderRadius: 5,
		width: 50,
		height: 30,

		alignSelf: "center",
		justifyContent: "center",
		textAlign: "center",
		margin: 20,
		padding: 5
	},
	subCards: {
		alignSelf: "center",
		width: 300
	},
	subHeaders: {
		alignSelf: "center",
		fontSize: 15
	},
	btn: {
		margin: 7
	},
})

export default Avaliacao
