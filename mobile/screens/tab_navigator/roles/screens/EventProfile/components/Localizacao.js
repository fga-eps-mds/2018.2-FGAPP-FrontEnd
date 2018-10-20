import React, { Component } from "react"
import { Card, CardItem, Icon } from "native-base"
import { View, Text, StyleSheet } from "react-native"
import CardHeader from './CardHeader'

class Localizacao extends Component {
	render() {
		return (
			<Card>
				<CardHeader text="Localização"/>

				<CardItem>
					<Icon name="pin" style={{ fontSize: 50, color:"black" }} />

					<Card
						transparent
						style={{ width: 250, marginLeft: 20 }}
					>
						<Text style={{ fontWeight: "bold" }}>
							{this.props.address}
						</Text>
						<Text style={{ color: "grey" }}>Endereço da localização gerada pelo Maps</Text>
					</Card>
				</CardItem>

				<CardItem style={{alignSelf:'center'}}>
					<View
						style={{
							backgroundColor: "grey",
							width: 300,
							height: 200,
							justifyContent: 'center',
						}}
					>
						<Text style={{textAlign:'center', color:'white'}}>GOOGLE MAPS API {"\n"}
						Link Address: {this.props.linkAddress}</Text>
					</View>
				</CardItem>
			</Card>
		)
	}
}

export default Localizacao