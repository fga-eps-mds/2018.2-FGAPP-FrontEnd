import React, { Component } from "react";
import { Card, CardItem, Body, Icon, Button, Input } from "native-base";
import {
	ScrollView,
	Text,
	StyleSheet,
	TouchableOpacity,
	View,
	TouchableHighlight,
	Image
} from "react-native";
import Modal from "react-native-modal";

export default class ImageModal extends Component {
	render() {
		return (
			<Modal
				isVisible={this.props.visible}
				onBackButtonPress={this.props.closeModal}
				onBackdropPress={this.props.closeModal}
				animationIn="fadeInUp"
				animationOut="fadeOutDown"
			>
				<Card styles={styles.modalCard}>
					<View>
						<Image
							source={{ uri: this.props.photoSrc }}
							style={{
								height: 300,
								width: "100%"
							}}
						/>
            <Button
              block
              dark  
              bordered
              onPress={()=>this.props.editBtn()}
            >
              <Icon type='Feather' name='edit'/>
              <Text>Enviar outra imagem</Text>
            </Button>
					</View>
				</Card>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	modalCard: {
		borderRadius: 10,
		width: "100%",
		alignSelf: "center",
		alignItems: "center"
  },
});
