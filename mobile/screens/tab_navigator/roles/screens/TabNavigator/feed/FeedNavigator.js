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

    Feed: {
        screen: Feed,
        navigationOptions: ({ navigation }) => ({
            header: null,
        }),
    },
})