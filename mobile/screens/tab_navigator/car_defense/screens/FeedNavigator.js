import React, { Component } from "react";
import {StackNavigator} from 'react-navigation'

import Feed from './Feed'


export default class FeedNavigator extends Component {

    render() {
        return (
            <FeedStackNavigator />
        );
    }
}

const FeedStackNavigator = new StackNavigator({

    PrivateNotifications: {
        screen: PrivateNotifications,
        navigationOptions: ({ navigation }) => ({
            header: null,
        }),
    },
})