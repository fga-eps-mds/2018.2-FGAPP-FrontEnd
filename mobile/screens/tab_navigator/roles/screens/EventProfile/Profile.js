import React, { Component } from "react";
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
} from "native-base";
import {
	View,
	ScrollView,
	Text,
	StyleSheet,
	Linking,
	TouchableOpacity,
	ActivityIndicator
} from "react-native";

import Geral from "./components/Geral";
import Detalhes from "./components/Detalhes";
import Avaliacao from "./components/Avaliacao";
import Localizacao from "./components/Localizacao";
import Contato from "./components/Contato";
import Comments from "../EventComments/Comments";

const noPic = require("../../static/noPic.png");

class Profile extends Component {
	state = {
		loading: true,
		role: ""
	};

	_getDadosRole = () => {

		const { idRole } = this.props.navigation.state.params;
		const eventPath = `${process.env.ROLES_EVENTS_API}/events/`;
		fetch(eventPath + idRole)
			.then(res => res.json())
			.then(resJson => {
				this.setState({ loading: false, role: resJson });
			})
			.catch(error => {
				this.setState({
					loading: false
				});
				console.error(error);
			});
	};

	componentDidMount() {
		this._getDadosRole();
	}

	render() {
		const { role } = this.state;
		if (this.state.loading) {
			return (
				<View
					style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
				>
					<ActivityIndicator size="large" color="#00a50b" />
				</View>
			);
		}
		return (
			<ScrollView>
				<Geral
					photo={role.photo}
					eventName={role.eventName}
					eventHour={role.eventHour}
					eventDate={role.eventDate}
					value={role.value}
					adultOnly={role.adultOnly}
				/>

				<Detalhes
					eventDescription={role.eventDescription}
					drinks={role.drinks}
					foods={role.foods}
					refURL={this.state.role.linkReference}
				/>

				<Avaliacao />

				<Localizacao placeName={role.address} placeRef={"RU UnB Gama"} />

				<Contato organizer={role.organizer} organizerTel={role.organizerTel} />
			</ScrollView>
		);
	}
}

export default Profile;
