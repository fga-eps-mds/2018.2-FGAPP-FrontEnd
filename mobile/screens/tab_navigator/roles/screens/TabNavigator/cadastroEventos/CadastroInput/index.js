import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Icon, Item, Input } from "native-base";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: "center",
		backgroundColor: "white"
	},
	inputContainer: {
		width: "80%",
		alignSelf: "center",
		justifyContent: "space-around",
		alignItems: "center",
		flexDirection: "row",
		marginTop: -5
	}
});

export default class CadastroInput extends Component {
	render() {
		return (
			<View style={styles.inputContainer}>
				<Icon
					type={this.props.iconType}
					name={this.props.iconName}
          style={{ fontSize: 30, marginTop: 15 }}
				/>
				<Item style={{ width: "80%" }}>
					<Input
						placeholder={this.props.placeholder}
            style={{ textAlign: "center" }}
            onChangeText={(text)=>this.props.onChangeText(text)}
            keyboardType = {this.props.keyboardType == null ? 'default' : this.props.keyboardType }
					/>
				</Item>
			</View>
		);
	}
}
