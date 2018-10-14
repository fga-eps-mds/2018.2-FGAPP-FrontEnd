import React, { Component } from "react";
import {StackNavigator} from 'react-navigation'

import PrivateFeed from './PrivateFeed'


export default class FeedNavigator extends Component {

    render() {
        return (
            <PrivateFeedStackNavigator />
        );
    }
}

const PrivateFeedStackNavigator = new StackNavigator({

    PrivateFeed: {
        screen: PrivateFeed,
        navigationOptions: ({ navigation }) => ({
            header: null,
        }),
    },
})