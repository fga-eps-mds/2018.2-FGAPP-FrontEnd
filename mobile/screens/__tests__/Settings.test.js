import React from 'react';
import Settings from '../tab_navigator/settings/settings/Settings';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import fetchMock from 'fetch-mock';

Enzyme.configure({ adapter: new Adapter() });

describe('Test Settings', () => {
    const navigation = {
        state: {
            params: {
                token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJvZ2VybGVua2VAZ21haWwuY29tIiwidXNlcl9pZCI6MSwib3JpZ19pYXQiOjE1NDE3MTk3NDksImV4cCI6MTU0MTcyMDA0OSwidXNlcm5hbWUiOiJyb2dlcmxlbmtlQGdtYWlsLmNvbSJ9.eCEGRB9yYAkP5iBIybeDsAoWk4HyusPUTX3LBiP0I64',
            }
        },
        navigate: jest.fn(),
    }

    const navigation2 = {
        state: {

        },
        navigate: jest.fn(),
    }

    beforeAll(() => {
        process.env.INTEGRA_LOGIN_AUTH = 'http://test.ip';
        profileInfoPath = `${process.env.INTEGRA_LOGIN_AUTH}/api/users/get_profile/`;
    });

    beforeEach(() => {
        fetchMock.restore();
    });

    it('renders correctly', () => {
        const tree = renderer.create(<Settings navigation={navigation} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly without token', () => {
        const wrapper = shallow(<Settings navigation={navigation2} />);
    });

    it('Test _loadProfile fetch with sucess', async (done) => {
        const wrapper = shallow(<Settings navigation={navigation} />);
        const state = {
            profileInfo: {
                name: 'Naruto Uzumaki',
                email: 'uzumakinaruto@gmail.com',
                photo: 'https://res-console.cloudinary.com/integraappfga/thumbnails/v1/image/upload/v1541537829/c2VuazJvZG54YW1vcHdsa215b3E=/grid'
            }
        }

        fetchMock.post(profileInfoPath, [
            {
                name: 'Naruto Uzumaki',
                email: 'uzumakinaruto@gmail.com',
                photo: 'https://res-console.cloudinary.com/integraappfga/thumbnails/v1/image/upload/v1541537829/c2VuazJvZG54YW1vcHdsa215b3E=/grid',
            }
        ]);

        wrapper.setState(state);
        await wrapper.instance()._loadProfile();

        process.nextTick(() => {
            done();
        });
    });

    it('Test _loadProfile fetch with error response', async (done) => {
        const wrapper = shallow(<Settings navigation={navigation} />);

        const state = {
            name: '',
            email: '',
            photo: 'https://res-console.cloudinary.com/integraappfga/thumbnails/v1/image/upload/v1541537829/c2VuazJvZG54YW1vcHdsa215b3E=/grid'
        }

        const error = {
            "error": "Usuário inválido."
        };

        fetchMock.post(profileInfoPath, { error });

        wrapper.setState(state);
        await wrapper.instance()._loadProfile();

        process.nextTick(() => {
            done();
        });
    });
});

describe('Testing Settings navigation', () => {
    let wrapper = null
    const spyNavigate = jest.fn()
    const props = {
        navigation: {
            navigate: spyNavigate,
            state: {}
        }
    }
    const params = {
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJvZ2VybGVua2VAZ21haWwuY29tIiwidXNlcl9pZCI6MSwib3JpZ19pYXQiOjE1NDE3MTk3NDksImV4cCI6MTU0MTcyMDA0OSwidXNlcm5hbWUiOiJyb2dlcmxlbmtlQGdtYWlsLmNvbSJ9.eCEGRB9yYAkP5iBIybeDsAoWk4HyusPUTX3LBiP0I64'
    }

    beforeEach(() => {
        wrapper = shallow(<Settings {...props} />)
        wrapper.setState({ params: params })
    })

    it('test user card navigation', async () => {
        const something = wrapper.find('Styled(ListItem)').at(0);
        something.simulate('press');
        await wrapper.instance();
        expect(spyNavigate).toBeCalled();
    })
});