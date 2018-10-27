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

    it('should test SingUp', (done) => {
        done()
    })

    it('should test _onPressButton', () => {
        wrapper.instance()._onPressButton()
    })
})
