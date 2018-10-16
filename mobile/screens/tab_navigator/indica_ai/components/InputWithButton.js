import React, { Component } from 'react'
import {
    View,
    StyleSheet
} from 'react-native'
import {
    Container,
    Form,
    Item,
    Input,
    Label,
    Button,
    Icon
} from 'native-base'

class InputWithButton extends Component {

    constructor(props) {
        super(props)
        this.state = {
            label: props.label,
            icon: props.icon,
            onPress: props.onPress,
            inputValue: props.inputValue ? props.inputValue : ''
        }
    }

    inputChange = value => {
      this.setState({
        inputValue: value
      });
    };

    render () {

        const {
            label,
            icon,
            onPress,
            inputValue
        } = this.state

        return (
                <View>
                  <Form style={styles.formStyle}>
                      <Container style={styles.containerStyle}>
                        <Item floatingLabel style={styles.itemStyle}>
                            <Label style={styles.labelStyle}>{label}</Label>
                            <Input
                                onChangeText={value => this.inputChange((value: text))}
                                value={inputValue}
                            />
                        </Item>
                      </Container>
                      <Button
                          dark
                          style={styles.buttonStyle}
                          onPress={(value) => this.state.onPress(inputValue)}
                      >
                          <Icon name={icon} style={styles.iconStyle}/>
                      </Button>
                  </Form>
                </View>
        )
    }
}

export default InputWithButton

const styles = StyleSheet.create({

  formStyle: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },

  containerStyle: {
    flex: 6,
    height: 50,
    borderColor: "gray",
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },

  itemStyle: {
    borderBottomWidth: 0
  },

  labelStyle: {
    top: -7,
    left: 5,
    opacity: 0.4
  },

  buttonStyle: {
    height: 50,
    flex: 1,
    backgroundColor: '#0AACCC',
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    alignSelf: 'flex-end'
  },

  iconStyle:{
    fontSize: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center'

  },
})
