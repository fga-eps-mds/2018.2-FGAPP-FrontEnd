import React, { Component } from "react"
import { Card, CardItem } from "native-base"
import { View, Text } from "react-native"

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
			<View>
				<Card>
					<Text>ID: {role.id}</Text>
					<Text>Nome do rolê: {role.eventName}</Text>
					<Text>Dono: {role.owner}</Text>
				</Card>
				
				<Card>
					<Text>Comidas: {role.foods}</Text>
					<Text>Bebidas: {role.drinks}</Text>
				</Card>

				<Card>
					<Text>Dia: {role.eventDate}</Text>
					<Text>Hora: {role.eventHour}</Text>
				</Card>
			</View>
		)
	}
}

export default Profile
