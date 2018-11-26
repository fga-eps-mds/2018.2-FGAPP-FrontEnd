import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import LoginScreen from '../LoginScreen'
import {KeyboardAvoidingView} from 'react-native';
import fetchMock from 'fetch-mock';

jest.mock('../components/Login')

configure({adapter: new Adapter()})

const TOKEN_EXAMPLE = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJvZ2VybGVua2VAZ21haWwuY29tIiwidXNlcl9pZCI6MSwib3JpZ19pYXQiOjE1NDE3MTk3NDksImV4cCI6MTU0MTcyMDA0OSwidXNlcm5hbWUiOiJyb2dlcmxlbmtlQGdtYWlsLmNvbSJ9.eCEGRB9yYAkP5iBIybeDsAoWk4HyusPUTX3LBiP0I64";

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

    it('should test componentWillUnmount', () =>{
        wrapper.instance().componentWillUnmount();
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

    it('should test _keyboardDidShow', () => {
        var a = wrapper.instance()._keyboardDidShow()
    })

    it('should test _keyboardDidHide', () => {
        var a = wrapper.instance()._keyboardDidHide()
    })

    it('should test _keyboardDidHide', () => {
        var a = wrapper.instance().termsOfUse()
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
    test('change input email ', () => {
        const email = wrapper.find('Field').at(0);
        email.simulate('changeText','text');
        expect(wrapper.state('email')).toBe('text');
    });
  
    test('change input password ', () => {
        const password = wrapper.find('Field').at(1);
        password.simulate('changeText','text');
        expect(wrapper.state('password')).toBe('text');
    });

    test('onPress SignUpButton', () => {
        const spyNavigate = jest.fn()
        const props = {
            navigation: {
            navigate: spyNavigate,
            state: {}
            }
        }
        const SignUp = wrapper.find('SignUpButton');
        SignUp.simulate('press');
    });

    test('onPress ResetPasswordButton', () => {
        const spyNavigate = jest.fn()
        const props = {
            navigation: {
            navigate: spyNavigate,
            state: {}
            }
        }
        const ResetPassword = wrapper.find('ResetPasswordButton');
        ResetPassword.simulate('press');
    });
})

describe('Test storeToken', () => {
    // Url to be mocked
    let notification_path = '';

    beforeAll(() => {
        process.env.VENDAS_API = 'http://test.ip';
        notification_path = `${process.env.VENDAS_API}/api/save_user_token/`;
    })

    beforeEach(() => {
        fetchMock.restore();
    })

    it('Test storeToken with sucess', async (done) => {
        const notification_token = "thisIsANotificationToken"
        const wrapper = shallow(<LoginScreen />);

        fetchMock.post(notification_path, [])

        await wrapper.instance().storeToken(TOKEN_EXAMPLE, notification_token)

        process.nextTick(() => {
            done();
        });
    });
});