import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from '../SignUpScreen'
import {KeyboardAvoidingView} from 'react-native';

jest.mock('../components/SingUp')

configure({adapter: new Adapter()})

describe('Testing SingUp', () => {
    let wrapper = null
    const spyNavigate = jest.fn()
    const props = {
        navigation:{
            navigate: spyNavigate
        }
    }
    beforeEach(() => {
        wrapper = shallow(<App {...props}/>)
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

    it('should test checkJson bad email', () => {
        const responseJson = {
            "email": "teste@email.com",
        }
        wrapper.instance().checkJson(responseJson)
        expect(wrapper.state('email_field_is_bad')).toBe(true)
        expect(wrapper.state('email_field_alerts')).toEqual(responseJson.email)
    })

    it('should test checkJson good email', () => {
        const responseJson = {}
        wrapper.instance().checkJson(responseJson)
        expect(wrapper.state('email_field_is_bad')).toBe(false)
        expect(wrapper.state('email_field_alerts')).toEqual([''])
    })

    it('should test checkJson bad password', () => {
        const responseJson = {
            "password1": "thisisabadpassword",
        }
        wrapper.instance().checkJson(responseJson)
        expect(wrapper.state('password_field_is_bad')).toBe(true)
        expect(wrapper.state('password_field_alerts')).toEqual(responseJson.password1)
    })

    it('should test checkJson good password', () => {
        const responseJson = {}
        wrapper.instance().checkJson(responseJson)
        expect(wrapper.state('password_field_is_bad')).toBe(false)
        expect(wrapper.state('password_field_alerts')).toEqual([''])
    })

    it('should test checkJson non field error', () => {
        const responseJson = {
            "non_field_errors": "error"
        }
        wrapper.instance().checkJson(responseJson)
        expect(wrapper.state('non_field_alert')).toEqual(responseJson.non_field_errors)
    })

    it('should test checkJson non field error', () => {
        const responseJson = {
            "token": "thisisafaketoken"
        }
        wrapper.instance().checkJson(responseJson)
        expect(spyNavigate).toHaveBeenCalled()
    })

})