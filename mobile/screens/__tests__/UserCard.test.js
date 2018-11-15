import React from 'react';
import UserCard from '../components/UserCard';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
//import fetchMock from 'fetch-mock';

Enzyme.configure({adapter: new Adapter()});

    it('renders correctly', () => {
        const tree = renderer.create(<UserCard />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Testing on Press', () => {
        const onPressMock = jest.fn();
        const wrapper = shallow(<UserCard onPress={onPressMock}/>);
        const button = wrapper.find('TouchableOpacity').at(0);
        button.simulate('press');
        expect(onPressMock).toBeCalled();
    })