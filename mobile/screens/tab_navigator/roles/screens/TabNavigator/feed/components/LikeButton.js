import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Icon, Button } from "native-base";

class LikeButton extends Component {
	state = {
		toggle: false
	};

	_onPress() {
		let newState = !this.state.toggle;
		this.setState({ toggle: newState });
	}

	render() {
		let toggle = this.state.toggle;
		const iconColor = this.state.toggle ? "#1CBD24" : "gray";
		return (
			<View flexDirection={"row"}>
				<Button transparent onPress={() => this._onPress()}>
					<Icon active style={{ color: iconColor }} name="thumbs-up" />
					<Text
						style={{
							textAlignVertical: "center",
							fontWeight: "bold",
							color: this.state.toggle ? "#1CBD24" : "gray"
						}}
					>
						{this.props.likeText}
					</Text>
				</Button>
			</View>
		);
	}
}

export default LikeButton;
