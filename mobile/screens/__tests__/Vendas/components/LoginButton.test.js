import React from 'react';
import LoginButton from '../../../components/LoginButton';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';

Enzyme.configure({adapter: new Adapter()});

  it('renders correctly', () => {
    const tree = renderer.create(<LoginButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Testing onPress', () => {
    const onPressMock = jest.fn();
    const wrapper = shallow(<LoginButton onPress = {onPressMock}/>);
    const button = wrapper.find('Styled(Button)').at(0);
    button.simulate('press');
    expect(onPressMock).toBeCalled();
  })
