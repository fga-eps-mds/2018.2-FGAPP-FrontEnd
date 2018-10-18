import React, { Component } from "react"
import {
	Card,
	CardItem,
	Left,
	Thumbnail,
	Body,
	Right,
	List,
	ListItem,
	Icon,
	Container,
	Button
} from "native-base"
import {
	View,
	ScrollView,
	Text,
	StyleSheet,
	Linking,
	TouchableOpacity
} from "react-native"

import Geral from "./components/Geral"
import Descricao from "./components/Descricao"
import Avaliacao from './components/Avaliacao'
import Comments from '../EventComments/Comments'

const noPic = require("../TabNavigator/feed/images/noPic.png")

class Profile extends Component {
	state = {
		loading: true,
		role: ""
	}

	_getDadosRole = id => {
		fetch("http://209.97.153.172:8002/events/" + id)
			.then(res => res.json())
			.then(resJson => {
				this.setState({ loading: false, role: resJson })
			})
			.catch(error => {
				this.setState({
					loading: false
				})
				console.error(error)
			})
	}

	_gotoURL = () => {
		Linking.openURL(this.state.role.linkReference)
	}

	componentDidMount() {
		const { idRole } = this.props.navigation.state.params
		this._getDadosRole(idRole)
	}

	render() {
		const { role } = this.state
		if (this.state.loading) {
			return (
				<View>
					<Text>LOADING...</Text>
				</View>
			)
		}
		return (
			<ScrollView>
				<Geral
					eventName={role.eventName}
					eventHour={role.eventHour}
					eventDate={role.eventDate}
					value={role.value}
					adultOnly={role.adultOnly}
				/>

				<Descricao
					eventDescription={role.eventDescription}
					linkAddress={role.linkAddress}
				/>

				<Avaliacao
				
				/>

				<Comments

				/>
			</ScrollView>
		)
	}
}
export default Profile
