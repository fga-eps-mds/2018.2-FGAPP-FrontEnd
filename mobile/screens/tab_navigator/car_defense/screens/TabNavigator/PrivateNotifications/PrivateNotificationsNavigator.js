import React, { Component } from "react";
import {StackNavigator} from 'react-navigation'

import PrivateNotifications from './PrivateNotifications'


export default class PrivateNotificationsNavigator extends Component {

    render() {
        return (
            <PrivateNotificationsStackNavigator />
        );
    }
}

const PrivateNotificationsStackNavigator = new StackNavigator({

    PrivateNotifications: {
        screen: PrivateNotifications,
        navigationOptions: ({ navigation }) => ({
            header: null,
        }),
    },
})
