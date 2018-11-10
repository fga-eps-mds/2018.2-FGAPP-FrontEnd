import React, { Component } from "react";
import { Card, CardItem, Body, Icon, Button, Input } from "native-base";
import {
	ScrollView,
	Text,
	StyleSheet,
	TouchableOpacity,
	Linking,
	View,
	TouchableHighlight
} from "react-native";
import Modal from "react-native-modal";
import { MapView } from "expo";

const styles = StyleSheet.create({
	modalCardInput: {
		flex: 2,
		backgroundColor: "white",
		borderRadius: 10,
		width: "100%",
		height: "20%",
		alignSelf: "stretch",
		alignItems: "stretch"
	},
	modalCardMaps: {
		flex: 8,
		backgroundColor: "white",
		borderRadius: 10,
		width: "100%",
		height: "80%",
		alignSelf: "stretch",
		alignItems: "stretch"
	}
});

export default class MapsModal extends Component {
	render() {
		return (
			<Modal
				isVisible={this.props.visible}
				onBackButtonPress={this.props.closeModal}
				onBackdropPress={this.props.closeModal}
				animationIn="fadeInUp"
				animationOut="fadeOutDown"
			>
				<Card style={styles.modalCardInput}>
					<Text style={{ margin: 10 }}>
						Informe o endereço físico do evento:
					</Text>
					<Input
						placeholder="Endereço"
						multiline={false}
						width="100%"
						//height={"10%"}
						style={{ textAlign: "center", borderWidth: 1 }}
					/>
				</Card>
				<Card style={styles.modalCardMaps}>
					<MapView
						style={{ flex: 1, height: "80%", width: "100%" }}
						initialRegion={{
							latitude: 37.78825,
							longitude: -122.4324,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421
						}}
					/>
				</Card>
			</Modal>
		);
	}
}
