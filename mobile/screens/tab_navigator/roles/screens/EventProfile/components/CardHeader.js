import React, {Component} from 'react'
import {Text} from 'react-native'

export default class CardHeader extends Component{
	render(){
		return(
			<Text style={{ color: "grey", marginBottom: 10 }}>{this.props.text}</Text>
		)
	}
}