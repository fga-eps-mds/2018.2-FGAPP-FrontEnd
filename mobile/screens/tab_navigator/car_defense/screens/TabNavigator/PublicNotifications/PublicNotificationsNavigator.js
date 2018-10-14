import React, { Component } from "react";
import {StackNavigator} from 'react-navigation'

import PublicNotifications from './PublicNotifications'


export default class PublicNotificationsNavigator extends Component {

    render() {
        return (
            <PublicNotificationsStackNavigator />
        );
    }
}

const PublicNotificationsStackNavigator = new StackNavigator({

    PublicNotificatios: {
        screen: PublicNotifications,
        navigationOptions: ({ navigation }) => ({
            header: null,
        }),
    },
})