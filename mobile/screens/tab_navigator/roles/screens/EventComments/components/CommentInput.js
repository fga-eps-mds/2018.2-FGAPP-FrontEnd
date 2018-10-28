import React, {Component} from 'react'
import {View, Text, ToastAndroid, StyleSheet, TextInput, Alert} from 'react-native'
import {Button} from 'native-base'
import Divider from '../../EventProfile/components/Divider'

_getDateTime = () =>{
	const date = new Date();
	let dia = date.getDate()
	let mes = date.getMonth()
	let ano = date.getFullYear()
	let hora = date.getHours()
	let minuto = date.getMinutes()

	return (dia+"/"+mes+"/"+ano+" "+hora+":"+minuto)
}

export default class CommentInput extends Component{
	state={
		commentText: "",
		author: "",
		postDateTime: "",
		modifyDateTime: ""
	}

	_commentValidate(){
		if(this.state.author.length <= 1){
			Alert.alert('Erro ao postar o comentário', 'Nome do Autor deve ter pelo menos 2 caracteres.')
			return false
		}
		else if(this.state.commentText.length <= 1){
			Alert.alert('Erro ao postar o comentário', 'O comentário deve ter pelo menos 2 caracteres.')
			return false
		}
		else return true
	}

	_postComment = async () => {
		if(this._commentValidate() == false) ToastAndroid.show('Erro ao postar o comentário.', ToastAndroid.LONG)
		else{
			fetch("https://5bc7da788bfe5a00131b6e6d.mockapi.io/eventComments/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					comment: this.state.commentText,
					author: this.state.author,
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
						ToastAndroid.show('Comentário Postado com sucesso!', ToastAndroid.LONG)
						this._commentTextArea.clear()
					}
				})
				.catch(err => {
					if (typeof err.text === "function") {
						err.text().then(errorMessage => {
							alert(errorMessage)
							console.log(errorMessage)
						})
					} else {
						alert("Erro na conexão.")
						console.log(err)
					}
				})
		}
	}

	render(){
		return(
			<View>
				<TextInput
					style={styles.textAreaAuthor}
					placeholder="Autor"
					underlineColorAndroid="transparent"
					multiline={false}
					onChangeText={(text)=>this.setState({author: text})}
					maxLength={40}
				/>

				<TextInput
					ref={input=>{this._commentTextArea = input}}
					style={styles.textAreaComment}
					placeholder="Novo Comentário"
					underlineColorAndroid="transparent"
					multiline={true}
					onChangeText={(text)=> this.setState({commentText: text})}
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
				<Divider size='80%'/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	textAreaAuthor:{
		width: '80%',
		alignSelf: 'center',
		borderColor:'grey',
		borderWidth:1,
		marginBottom: 5,
		padding:10
	},
	textAreaComment:{
		height: 100,
		width:'80%', 
		alignSelf:'center',
		borderColor:'grey',
		borderWidth:1,
		padding:10
	},
	submitCommentBtn:{
		marginTop: 20, 
		width:'80%', 
		alignSelf:'center',
	}
})