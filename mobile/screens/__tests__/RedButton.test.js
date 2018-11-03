import React from 'react';
import RedButton from '../tab_navigator/vendas/components/RedButton';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';

Enzyme.configure({adapter: new Adapter()});

  it('renders correctly', () => {
    const tree = renderer.create(<RedButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Testing onPress', () => {
    const onPressMock = jest.fn();
    const wrapper = shallow(<RedButton onPress = {onPressMock}/>);
    const button = wrapper.find('TouchableOpacity').at(0);
    button.simulate('press');
    expect(onPressMock).toBeCalled();
  })
