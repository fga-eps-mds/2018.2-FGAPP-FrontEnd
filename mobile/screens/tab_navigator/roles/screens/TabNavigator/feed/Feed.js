import { Icon, Text } from "native-base";

import React, { Component } from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	RefreshControl,
	ActivityIndicator
} from "react-native";
import FeedItem from "./FeedItem";
import * as helpers from "../../../utils/helpers";

class Feed extends Component {
	async componentWillMount() {
		await Expo.Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
			Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
		});
		this.setState({ loading: false });
	}

	componentDidMount() {
		// this._refreshFeed()
	}

	state = {
		loading: false,
		roles: [],
		refreshing: false,
		feedInit: true
	};

	_refreshFeed = () => {
		this.state.feedInit == true && this.setState({ feedInit: false });
		this.setState({ refreshing: true, loading: true });
		fetch("http://roles-events.herokuapp.com/events/")
			.then(res => res.json())
			.then(resJson => {
				// RETIRANDO EVENTOS PASSADOS
				resJson = resJson.filter((role, index, array) => {
					const eventDay = helpers.formatDate(role.eventDate).intDay;
					const eventMonth = helpers.formatDate(role.eventDate)
						.intMonth;
					const eventYear = helpers.formatDate(role.eventDate)
						.intYear;
					const dayNow = helpers.timeNow().day;
					const monthNow = helpers.timeNow().month;
					const yearNow = helpers.timeNow().year;

					if (
						yearNow <= eventYear &&
						monthNow <= eventMonth &&
						dayNow < eventDay
					) {
						return role;
					} else {
						console.log(
							role.eventName + ":\t",
							helpers.formatDate(role.eventDate).formatted,
							"\tEVENTO PASSADO!"
						);
					}
				});

				this.setState({ loading: false, roles: resJson });
			})
			.then(() => {
				this.setState({ refreshing: false });
			})
			.catch(error => {
				this.setState({
					loading: false
				});
				console.error(error);
			});
	};

	render() {
		return (
			<View>
				{this.state.loading && (
					<View
						style={{
							flex: 1,
							margin: "50%"
						}}
					>
						<ActivityIndicator size="large" color="#00a50b" />
					</View>
				)}

				{this.state.feedInit == true ? (
					<ScrollView
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this._refreshFeed}
								title=""
							/>
						}
					>
						<View style={styles.refreshBox}>
							<Text style={styles.refreshBoxText}>
								<Icon name="refresh" />
								{"\n"}
								Puxe para carregar o feed
							</Text>
						</View>
					</ScrollView>
				) : (
					<ScrollView
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this._refreshFeed}
							/>
						}
					>
						{this.state.roles.map((role, index) => (
							<FeedItem
								key={index}
								idRole={role.id}
								imgRole={role.photo}
								nomeRole={role.eventName}
								org={role.owner}
								eventDate={role.eventDate}
								navigation={this.props.navigation}
							/>
						))}
					</ScrollView>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	refreshBox: {
		height: 100,
		width: 100,
		backgroundColor: "white",
		borderRadius: 20,
		alignSelf: "center",
		margin: "50%",
		borderWidth: 1
	},
	refreshBoxText: {
		alignSelf: "center",
		textAlign: "center",
		margin: 5,
		color: "black"
	}
});

export default Feed;