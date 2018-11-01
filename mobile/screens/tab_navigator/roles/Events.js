import React, {Component} from 'react'
import {StackNavigator} from 'react-navigation'

import Feed from './screens/TabNavigator/feed/Feed'
import Profile from './screens/EventProfile/Profile'
import Comments from './screens/EventComments/Comments'

export default class Events extends Component{
	render(){
		return(
			<StackEvents/>
		)
	}
}

const StackEvents = StackNavigator({
	Feed:{
		screen: Feed,
		navigationOptions: ({ navigation }) => ({
			header: null,
		}),
	},

	Profile:{
		screen: Profile,
		navigationOptions: ({ navigation }) => ({
			// header: null,
		}),
	},

	Comments: {
		screen: Comments,
		navigationOptions: ({ navigation }) => ({
			// header: null,
		}),
	},


})