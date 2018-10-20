import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {Form, Item, Input, Textarea, Button} from 'native-base'
import Divider from '../../EventProfile/components/Divider'

state={
	commentText: "",
	author: "",
	postDateTime: "",
	modifyDateTime: ""
}

const date = new Date();
_getDateTime = () =>{
	let dia = date.getDate()
	let mes = date.getMonth()
	let ano = date.getFullYear()
	let hora = date.getHours()
	let minuto = date.getMinutes()

	return (dia+"/"+mes+"/"+ano+" "+hora+":"+minuto)
}

export default class CommentInput extends Component{

	_postComment = async () => {
		fetch("https://5bc7da788bfe5a00131b6e6d.mockapi.io/eventComments/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				comment: this.state.commentText,
				author: "Eu",
				postDateTime: _getDateTime(),
			})
		})
			.then(response => response.json())
			.then(responseJson => {
				//Sucesso
				if ((responseJson = !undefined)) {
					console.log(
						"Comentário postado com sucesso!"
					)
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

	render(){
		return(
			<View>
				<Textarea 
					style={{width:'80%', alignSelf:'center'}}
					rowSpan={3} 
					bordered 
					placeholder="Novo Comentário"
					multiline={true}
					onChangeText={(text)=>this.setState({commentText: text})}
				/>
				<Button success block style={{marginTop: 20, width:'80%', alignSelf:'center'}} onPress={this._postComment}>
					<Text>Enviar Comentário</Text>
				</Button>
				<Divider size='80%'/>
			</View>
		)
	}
}