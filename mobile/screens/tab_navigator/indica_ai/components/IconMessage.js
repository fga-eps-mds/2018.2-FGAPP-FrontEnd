import React, { Component } from 'react'
import {
    View,
    StyleSheet
} from 'react-native'
import { Container, Content, Card, CardItem, Text, Icon, Right } from 'native-base'

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
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Text style={styles.viewStyle}>{message}</Text> 
                            <Right>
                                <Icon name={icon} style={styles.iconStyle}/>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
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
        fontSize: 30,
        color: '#0AACCC'
    }
})
