import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import LoginScreen from '../LoginScreen'
import {KeyboardAvoidingView} from 'react-native';

jest.mock('../components/Login')

configure({adapter: new Adapter()})

describe('Testing Login', () => {
    let wrapper = null
    const spyNavigate = jest.fn()
    const props = {
        navigation:{
            navigate: spyNavigate
        }
    }
    beforeEach(() => {
        wrapper = shallow(<LoginScreen {...props}/>)
        wrapper.setState({email_field_is_bad: false})
        wrapper.setState({password_field_is_bad: false})
        wrapper.setState({email_field_alerts: ['']})
        wrapper.setState({password_field_alerts: ['']})
        wrapper.setState({non_field_alerts: ['']})
    })

    it('should have Field', () => {
        expect(wrapper.find(KeyboardAvoidingView)).toHaveLength(1)
    })

    it('should test SignUp', (done) => {
        done()
    })

    it('should test _onPressButton', () => {
        var a = wrapper.instance()._onPressButton()
    })

    it('should test checkJson bad username', () => {
        const responseJson = {
            "username": "teste@email.com",
        }
        wrapper.instance().checkJson(responseJson)
        expect(wrapper.state('email_field_is_bad')).toBe(true)
        expect(wrapper.state('email_field_alerts')).toEqual(responseJson.username)
    })

    it('should test checkJson good email', () => {
        const responseJson = {}
        wrapper.instance().checkJson(responseJson)
        expect(wrapper.state('email_field_is_bad')).toBe(false)
        expect(wrapper.state('email_field_alerts')).toEqual([''])
    })

    it('should test checkJson bad password', () => {
        const responseJson = {
            "password": "thisisabadpassword",
        }
        wrapper.instance().checkJson(responseJson)
        expect(wrapper.state('password_field_is_bad')).toBe(true)
        expect(wrapper.state('password_field_alerts')).toEqual(responseJson.password)
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
