import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Icon, Button } from "native-base";

class LikeButton extends Component {
	state = {
		toggle: false
    };

	_onPress() {
		let newState = !this.state.toggle;
		this.setState({ toggle: newState });
	};

	render() {
		let toggle = this.state.toggle;
		const iconColor = this.state.toggle ? "limegreen" : "gray";
		return (
			<View>
				<Button transparent onPress={() => this._onPress()}>
					<Icon active style={{color: iconColor}} name="thumbs-up" />
				</Button>
			</View>
		);
	}
}

export default LikeButton;
