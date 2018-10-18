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

class Avaliacao extends Component {
	render() {
		return (
			<Card>
				<Text style={{ color: "grey" }}>Avaliação</Text>

				<Body>
					<List>
						<ListItem>
							<Card transparent style={styles.subCards}>
								<Text style={styles.subHeaders}>
									Como está o evento?
								</Text>
								
								<CardItem style={{ alignSelf: "center" }}>
									<Left>
										<TouchableOpacity>
											<Icon
												name="thumbs-up"
												style={{ fontSize: 40 }}
											/>
										</TouchableOpacity>

										<Text style={styles.likeDislikeBox}>
											11
										</Text>
									</Left>

									<Right>
										<CardItem>
											<Text style={styles.likeDislikeBox}>
												4
											</Text>
											<TouchableOpacity>
												<Icon
													name="thumbs-down"
													style={{
														fontSize: 40,
														color: "black"
													}}
												/>
											</TouchableOpacity>
										</CardItem>
									</Right>
								</CardItem>
							</Card>
						</ListItem>

						<ListItem>
							<Card transparent style={styles.subCards}>
								<Text style={styles.subHeaders}>
									Chame alguém!
								</Text>
								<Button block primary style={styles.btn}>
									<Icon name="share" />
									<Text style={{ color: "white" }}>
										Compartilhar
									</Text>
								</Button>

								<Text style={styles.subHeaders}>
									Fale que chegou!
								</Text>
								<Button block success style={styles.btn}>
									<Icon name="pin" />
									<Text style={{ color: "white" }}>
										Check-in
									</Text>
								</Button>
							</Card>
						</ListItem>
					</List>
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
	}
})

export default Avaliacao
