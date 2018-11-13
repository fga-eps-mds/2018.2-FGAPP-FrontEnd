import React, { Component } from "react";
import {
	View,
	Text,
	ToastAndroid,
	StyleSheet,
	TextInput,
	Alert
} from "react-native";
import { Button } from "native-base";
import Divider from "../../EventProfile/components/Divider";

_getDateTime = () => {
	const date = new Date();
	let dia = date.getDate();
	let mes = date.getMonth();
	let ano = date.getFullYear();
	let hora = date.getHours();
	let minuto = date.getMinutes();

	//return dia + "/" + mes + "/" + ano + " " + hora + ":" + minuto;
	return ano + "-" + mes + "-" + dia //Novo formato de data da API
};

export default class CommentInput extends Component {
	state = {
		author: "",
		text: "",
		answerId: null,
		created: null,
		edited: null
	};

	_commentValidate() {
		if (this.state.author.length <= 1) {
			Alert.alert(
				"Erro ao postar o comentário",
				"Nome do Autor deve ter pelo menos 2 caracteres."
			);
			return false;
		} else if (this.state.text.length <= 1) {
			Alert.alert(
				"Erro ao postar o comentário",
				"O comentário deve ter pelo menos 2 caracteres."
			);
			return false;
		} else return true;
	}

	_postComment = async () => {
		if (this._commentValidate() == false)
			ToastAndroid.show("Erro ao postar o comentário.", ToastAndroid.LONG);
		else {
			fetch("http://roles-comments.herokuapp.com/comment/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({

					author: this.state.author,
					text: this.state.text,
					answerId: 0,
					created: _getDateTime(),
					edited: this.state.edited
				})
			})
				.then(response => response.json())
				.then(responseJson => {
					//Sucesso
					console.log(responseJson)
					if ((responseJson = !undefined)) {
						console.log(responseJson)
						console.log("Comentário postado com sucesso!");
						ToastAndroid.show(
							"Comentário Postado com sucesso!",
							ToastAndroid.LONG
						);
						this._textArea.clear();
					}else {
						console.log("teste");
					}
				})
				.catch(err => {
					if (typeof err.text === "function") {
						err.text().then(errorMessage => {
							alert(errorMessage);
							console.log(errorMessage);
						});
					} else {
						alert("Erro na conexão.");
						console.log(err);
					}
				});
		}
	};

	render() {
		return (
			<View>
				<TextInput
					style={styles.textAreaAuthor}
					placeholder="Autor"
					underlineColorAndroid="transparent"
					multiline={false}
					onChangeText={text => this.setState({ author: text })}
					maxLength={40}
				/>

				<TextInput
					ref={input => {
						this._textArea = input;
					}}
					style={styles.textAreaComment}
					placeholder="Novo Comentário"
					underlineColorAndroid="transparent"
					multiline={true}
					onChangeText={text => this.setState({ text: text })}
					maxLength={128}
				/>
				<Button
					success
					block
					style={styles.submitCommentBtn}
					onPress={() => this._postComment()}
				>
					<Text>Enviar Comentário</Text>
				</Button>
				<Divider size="80%" />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	textAreaAuthor: {
		width: "80%",
		alignSelf: "center",
		borderColor: "grey",
		borderWidth: 1,
		marginBottom: 5,
		padding: 10
	},
	textAreaComment: {
		height: 100,
		width: "80%",
		alignSelf: "center",
		borderColor: "grey",
		borderWidth: 1,
		padding: 10
	},
	submitCommentBtn: {
		marginTop: 20,
		width: "80%",
		alignSelf: "center"
	}
});
