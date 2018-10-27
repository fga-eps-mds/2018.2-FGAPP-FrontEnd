import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from '../SignUpScreen'
import {KeyboardAvoidingView} from 'react-native';

jest.mock('../components/SingUp')

configure({adapter: new Adapter()})

describe('Testing SingUp', () => {
    let wrapper = null
    beforeEach(() => {
        wrapper = shallow(<App />)
        wrapper.setState({email_field_is_bad: false})
        wrapper.setState({password_field_is_bad: false})
        wrapper.setState({email_field_alerts: ['']})
        wrapper.setState({password_field_alerts: ['']})
        wrapper.setState({non_field_alerts: []})
    })

    it('should show Field', () => {
        expect(wrapper.find(KeyboardAvoidingView)).toHaveLength(1)
    })

    it('should test SingUp', (done) => {
        done()
    })

    it('should test _onPressButton', () => {
        wrapper.instance()._onPressButton()
    }) 

    it('should test checkJson', () => {
        const responseJson = {
            "email": "teste@email.com",
        }
        wrapper.instance().checkJson(responseJson)
        expect(wrapper.state('email_field_is_bad')).toBe(true)
        expect(wrapper.state('email_field_alerts')).toEqual(responseJson.email)
    })
})