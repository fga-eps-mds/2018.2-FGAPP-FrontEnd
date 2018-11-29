import React, { Component } from "react"
import { Card, CardItem, Icon } from "native-base"
import {
	ScrollView,
	Text,
	StyleSheet,
	Linking,
} from "react-native"
import Modal from "react-native-modal"

class DescModals extends Component {
	_gotoURL = () => {
		Linking.openURL(this.props.refURL)
	}

	render() {
		const alturaDinamica = this.props.text.length > 200 ? '60%':'30%'
		return (
			<Modal
				isVisible={this.props.visible}
				onBackButtonPress={this.props.goBack}
				onBackdropPress={this.props.goBack}
				animationIn="fadeInUp"
				animationOut="fadeOutDown"
			>
				<Card style={styles.modalCard}>
					<CardItem
						header
						bordered
						style={{ height: 50, alignSelf: "center" }}
					>
						<Icon name={this.props.icon} style={this.props.color == null ? {color:'black'} : {color:this.props.color}}/>
						<Text 
							style={this.props.color == null ? {color:'black'} : {color:this.props.color}}
						>
							{this.props.headerLabel}
						</Text>
					</CardItem>

					<ScrollView
						style={{
							height: alturaDinamica,
							backgroundColor: "#f2f2f2",
						}}
					>
						<Text style={{ textAlign: "center"}}>
							{"\n" + this.props.text + "\n"}
						</Text>
					</ScrollView>

				</Card>
			</Modal>
		)
	}
}

const styles=StyleSheet.create({
	modalCard: {
		width: "90%",
		alignSelf: "center",
		borderRadius: 10
	}
})

export default DescModals