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
		width: "100%",
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
				<Item style={{ width: "80%" }}>
          <Icon type={this.props.iconType} name={this.props.iconName} />
					<Input
						placeholder={this.props.placeholder}
            style={{ textAlign: "center" }}
            onChangeText={(text)=>this.props.onChangeText(text)}
            keyboardType = {this.props.keyboardType == null ? 'default' : this.props.keyboardType }
            defaultValue=''
            value={this.props.value === '' || this.props.value === null ? '' : this.props.value } 
					/>
          {this.props.required && 
            <Icon style={{color: 'rgba(255,0,0,0.2)'}} type="FontAwesome" name="exclamation"/>
          }
				</Item>
			</View>
		);
	}
}
