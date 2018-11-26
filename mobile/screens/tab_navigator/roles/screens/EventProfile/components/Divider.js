import React, { Component } from "react"
import { View} from "react-native"

export default class Divider extends Component {
	render() {
		const widthSize = this.props.size != null ? this.props.size : 100
		return (
			<View
				style={{
					borderWidth: 0.25,
					width: widthSize,
					opacity: 0.25,
					margin: 20,
					alignSelf: "center"
				}}
			/>
		)
	}
}
