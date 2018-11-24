import React, { Component } from "react"
import {
	Card,
	CardItem,
	Icon,
} from "native-base"
import {
	ScrollView,
	Text,
	StyleSheet,
} from "react-native"

import CardsDetalhes from './CardsDetalhes'
import Divider from './Divider'
import CardHeader from "./CardHeader";

class Contato extends Component {
	render() {
		return (
			<Card>
				<CardHeader text="Suporte"/>

				<CardsDetalhes 
					descricao = "TEXTO FAQ"
					icon='quote'
					label='FAQ'
					color='black'
				/>

				<Divider/>

				<CardItem style={{alignSelf:'center', width:'100%'}}>
					<Card style={{ width: '100%', alignSelf:'center'}}>
						<CardItem>
							<Icon name="contact" style={styles.contactIcon} />
							<Card transparent style={{ marginLeft: 10 }}>
								<Text style={{ fontWeight: "bold" }}>
									{this.props.organizer}
								</Text>
								<Text>{this.props.organizerTel}</Text>
							</Card>
						</CardItem>
					</Card>
				</CardItem>
			</Card>
		)
	}
}

const styles = StyleSheet.create({
	
	contactIcon:{
		width:50, 
		fontSize: 50, 
		color: "#014421",
	}
})

export default Contato