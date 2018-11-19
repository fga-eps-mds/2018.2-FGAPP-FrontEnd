import React, { Component } from 'react'
import {
    View,
    StyleSheet
} from 'react-native'
import {
    Text,
    Button,
    Icon
} from 'native-base'

class ButtonWithIcon extends Component {

    constructor(props) {
        super(props)
        this.state = {
            label: props.label,
            icon: props.icon,
            onPress: props.onPress
        }
    }

    render () {

        const {
            label,
            icon,
            onPress,
        } = this.state

        return (
          <Button
            style={styles.registerButton}
            block
            info
            iconLeft
            onPress={onPress}
          >
            <Icon
              name={icon}
              color='white'
              size={25}
            />
            <Text style={{color: 'white'}}>{label}</Text>
          </Button>
        )
    }
}

export default ButtonWithIcon

const styles = StyleSheet.create({
  registerButton: {
    top: 30,
    marginHorizontal: 10
  }

});
