import React from 'react';
import UserProfile from '../tab_navigator/settings/settings/UserProfile';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import fetchMock from 'fetch-mock';

Enzyme.configure({adapter: new Adapter()});

describe('Test UserProfile', () => {
    const navigation = {
        state: {
            params: {
                token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJvZ2VybGVua2VAZ21haWwuY29tIiwidXNlcl9pZCI6MSwib3JpZ19pYXQiOjE1NDE3MTk3NDksImV4cCI6MTU0MTcyMDA0OSwidXNlcm5hbWUiOiJyb2dlcmxlbmtlQGdtYWlsLmNvbSJ9.eCEGRB9yYAkP5iBIybeDsAoWk4HyusPUTX3LBiP0I64',
                userInfo: {
                    name: 'user1',
                    email: 'superuser1@user.com',
                    photo: 'www.notareallink.com/teste1'
                }
            }
        },
        navigate: jest.fn(),
    }

    it('renders correctly', () => {
        const tree = renderer.create(<UserProfile navigation = {navigation}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
})