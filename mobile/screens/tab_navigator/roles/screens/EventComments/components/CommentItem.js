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
import {
	StyleSheet,
	Image,
	View,
	TouchableOpacity,
	ScrollView
} from "react-native"
import Divider from "../../EventProfile/components/Divider"

class CommentItem extends Component {
	render() {
		return (
			<View>
				<Card transparent>
					<CardItem>
						<Icon name="person" />
						<View style={{width: '100%'}}>
							<View>
								<Text style={{ fontWeight: "bold" }}>
									{this.props.author}
								</Text>

								{this.props.comment.length > 200 
									? 
										<View>
											<Text>{this.props.comment.slice(200)}... - </Text>
											<TouchableOpacity>
												<Text>Ver Mais</Text>
											</TouchableOpacity>
										</View>
									: <Text>{this.props.comment}</Text>
								}
								<Text style={{color:'grey', fontSize:12}}>Postado em: {this.props.postDate}</Text>
								{this.props.modifyDate != null &&  <Text style={{color:'grey', fontSize:12}}>Modificado em: {this.props.modifyDate}</Text>}
							</View>
						</View>
					</CardItem>
				</Card>

				<Divider size="80%" />
			</View>
		)
	}
}

export default CommentItem
