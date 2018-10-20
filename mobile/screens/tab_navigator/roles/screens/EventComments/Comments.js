import React, { Component } from "react"
import { Card, CardItem, Left, Thumbnail, Body } from "native-base"
import { View, Text, FlatList, ScrollView } from "react-native"

import CommentItem from "./components/CommentItem"

const noPic = require("../../static/noPic.png")

class Comments extends Component {
	state = {
		loading: true,
		comment: [],

		commentText: "",
		author: "",
		postDateTime: "",
		modifyDateTime: ""
	}

	_postComment = async () => {
		fetch("https://5bc7da788bfe5a00131b6e6d.mockapi.io/eventComments/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				commentText: this.state.commentText,
				author: this.state.author,
				postDateTime: this.state.postDateTime,
				modifyDateTime: this.state.modifyDateTime
			})
		})
			.then(response => response.json())
			.then(responseJson => {

				//Sucesso
				if ((responseJson = !undefined)) {
					console.log("Comentário postado com sucesso!" + this.state.commentText)
				}
			})
			.catch(err => {
				if (typeof err.text === "function") {
					err.text().then(errorMessage => {
						alert(errorMessage)
						console.log(errorMessage)
					})
				} else {
					Alert.alert("Erro na conexão.")
					console.log(err)
				}
			})
	}

	_getComments = () => {
		fetch("https://5bc7da788bfe5a00131b6e6d.mockapi.io/eventComments/")
			.then(res => res.json())
			.then(resJson => {
				this.setState({ loading: false, comment: resJson })
			})
			.catch(error => {
				this.setState({
					loading: false
				})
				console.error(error)
			})
	}

	componentDidMount() {
		this._getComments()
	}

	render() {
		const { comment } = this.state
		if (this.state.loading) {
			return (
				<View>
					<Text>
						Carregando...
						{this.state.comment}
					</Text>
				</View>
			)
		}

		return (
			<Card>
				<Text style={{ color: "grey", marginBottom: 10 }}>
					Comentários
				</Text>
				{this.state.comment.map((comment, index) => (
					<CommentItem
						key={index}
						idComment={comment.id}
						author={comment.author}
						comment={comment.comment}
						postDate={comment.postDateTime}
						modifyDate={comment.modifyDateTime}
					/>
				))}
			</Card>
		)
	}
}

export default Comments
