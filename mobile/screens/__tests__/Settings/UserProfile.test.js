import React from 'react';
import UserProfile from '../../tab_navigator/settings/settings/UserProfile';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import fetchMock from 'fetch-mock';

Enzyme.configure({adapter: new Adapter()});

function FormDataMock(){
    this.append = jest.fn();
}
global.FormData = FormDataMock;

describe('Test UserProfile', () => {
    const spyNavigate = jest.fn();
    const navigation = {
        navigate: spyNavigate,
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
    }

    let logoutPath = '';
    let updateProfilePath = '';

    beforeAll(() => {
        process.env.INTEGRA_LOGIN_AUTH = 'http://test.ip';
        logoutPath = `${process.env.INTEGRA_LOGIN_AUTH}/api/logout/`;
        updateProfilePath = `${process.env.INTEGRA_LOGIN_AUTH}/api/users/update_profile/`;
    })

    beforeEach(() => {
        fetchMock.restore();
    })

    it('renders correctly', () => {
        const tree = renderer.create(<UserProfile navigation = {navigation}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Test logout with sucess', async(done) => {
        const wrapper = shallow(<UserProfile navigation={navigation}/>);

        fetchMock.post(logoutPath, {
        });
        
        await wrapper.instance()._logout();
        process.nextTick(() => {
            done();
        });
    });

    it('Test edit Profile with sucess', async(done) => {
        const wrapper = shallow(<UserProfile navigation = {navigation}/>);

        fetchMock.post(updateProfilePath, {
            "token": null,
            "userInfo": {
              "email": "email@teste.com",
               "name": "New Name",
               "photo": "http://res.cloudinary.com/integraappfga/image/upload/v1542241982/wzkuyetsbnkna2jrux22.jpg",
           },
        });


        const state = {
            name: 'New Name',
            email: 'email@teste.com',
            photo: 'http://res.cloudinary.com/integraappfga/image/upload/v1542241982/wzkuyetsbnkna2jrux22.jpg',
        };

        wrapper.setState(state);
        await wrapper.instance()._editProfile();

        process.nextTick(() => { 
            done();
        });
    });

    it('Should test navigation', async() => {
        const wrapper = shallow(<UserProfile navigation = {navigation}/>); 
        await wrapper.instance()._goBack();
        expect(spyNavigate).toHaveBeenCalled();
    });

    it('Test clickPhoto', () => {
        const wrapper = shallow(<UserProfile navigation = {navigation}/>); 
        const clickPhoto = wrapper.instance()._clickPhoto();
    });

    it('Test _editProfile fetch with error response', async (done) => {
        const wrapper = shallow(<UserProfile navigation={navigation} />);

        const state = {
            name: 'SomeName',
            email: '',
            photo: 'https://res-console.cloudinary.com/integraappfga/thumbnails/v1/image/upload/v1541537829/c2VuazJvZG54YW1vcHdsa215b3E=/grid'
        }

        const error = {
            "error": "Email inválido."
        };

        fetchMock.post(updateProfilePath, { error });

        wrapper.setState(state);
        await wrapper.instance()._editProfile();

        process.nextTick(() => {
            done();
        });
    });

    
    
})

