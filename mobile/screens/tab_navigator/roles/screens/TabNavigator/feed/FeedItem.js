import {
	Body,
	Button,
	Icon,
	Card,
	CardItem,
	Text,
	Thumbnail,
	Left,
} from "native-base";

import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import * as helpers from "../../../utils/helpers";

const noPic = require("../../../static/noPic.png");

class FeedItem extends Component {
  state = {
    commentsLength: 0,
  }

  _getCommentsLength(){
    return fetch( 'http://roles-comments.herokuapp.com/comment/?eventID='+this.props.idRole )
    .then(res => res.json())
    .then(resJson => {
      if(resJson.length){
        this.setState({commentsLength: resJson.length})
      }
    })
    .catch( () => {});
  }

  componentWillMount(){
    this._getCommentsLength()
  }
  

	render() {
		const uri = this.props.imgRole;
		const { state } = this.props.navigation;
    const token = state.params ? state.params.token : undefined;
		return (
			<Card style={styles.mb}>
				<TouchableOpacity
					onPress={() => {
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
            style={{width: '100%'}}
            block
						transparent
						onPress={() => {
							this.props.navigation.navigate("Comments", {
								idRole: this.props.idRole,
								eventName: this.props.nomeRole,
								token: token,
							});
						}}
					>
						<Icon active name="chatbubbles" style={{ color: "gray" }} />
						<Text
							style={{ textAlign: "center", color: "gray", fontWeight: "bold" }}
						>
						{this.state.commentsLength}	Comentários
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
