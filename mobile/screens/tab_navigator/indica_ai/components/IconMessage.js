import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import {
    Container,
    Item,
    Icon
} from 'native-base'

class IconMessage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            icon: props.icon,
            message: props.message ? props.message : ''
        }
    }

    render () {

        const {
            icon,
            message
        } = this.state

        return (
                <View>
                    <Text>{message}</Text>
                    <Icon name={icon} style={styles.iconStyle}/>
                </View>
        )
    }
}

export default IconMessage

const styles = StyleSheet.create({

    viewStyle: {
        textAlign: 'center'
    },

    iconStyle: {
        opacity: 0.5,
        fontSize: 150
    }
})
