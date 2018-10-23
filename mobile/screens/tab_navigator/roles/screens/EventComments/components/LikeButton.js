import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Icon, Button } from "native-base";

class LikeButton extends Component {
	render() {
		return (
			<View>
				<Button transparent onPress={() => {}}>
					<Icon active name="thumbs-up" />
				</Button>
			</View>
		);
	}
}

export default LikeButton