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

const styles = StyleSheet.create({
	modalCard: {
		backgroundColor: "white",
		borderRadius: 10,
		width: "100%",
		height: "80%",
		alignSelf: "center",
		alignItems: "center",
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
				<Card style={styles.modalCard}>
						<Text style={{ margin: 10,  }}>
							Informe o endereço físico do evento:
						</Text>
						<Input placeholder="Endereço" multiline={false} width='100%' height={30} style={{textAlign:'center', borderWidth:1}} />
				</Card>
			</Modal>
		);
	}
}
