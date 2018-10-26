import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from '../SignUpScreen'
import {KeyboardAvoidingView} from 'react-native';

configure({adapter: new Adapter()})

describe('Testing SingUp', () => {
    let wrapper = null
    beforeEach(() => {
        wrapper = shallow(<App />)
    })

    it('should show Field', () => {
        expect(wrapper.find(KeyboardAvoidingView)).toHaveLength(1)
    })
})