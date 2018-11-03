import React from 'react';
import MyProducts from '../tab_navigator/vendas/screens/my_products/MyProducts';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';

Enzyme.configure({adapter: new Adapter()});

it('renders correctly', () => {
  const navigation = jest.fn();
  const tree = renderer.create(<MyProducts navigation={navigation}/>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('test loadUserProducts function',() => {
  const navigation = jest.fn();
  const wrapper = shallow(<MyProducts navigation = {navigation}/>);
  const loadUserProducts = wrapper.instance().loadUserProducts();
});

it('test refreshUserProducts function',() => {
  const navigation = jest.fn();
  const wrapper = shallow(<MyProducts navigation = {navigation}/>);
  const refreshUserProducts = wrapper.instance().refreshUserProducts();
});

// it('Testing onPress in ProductCard', () => {
//   const onPressMock = jest.fn();
//   const wrapper = shallow(<MyProducts onPress = {onPressMock}/>);
//   const button = wrapper.find('ProductCard').at(0);
//   button.simulate('press');
//   expect(onPressMock).toBeCalled();
// })

// it('Testing onPress in ProductCard', () => {
//   const onPressMock = jest.fn();
//   const wrapper = shallow(<MyProducts onPress = {onPressMock}/>);
//   const something = wrapper.find('Fab').at(0);
//   something.simulate('press');
//   expect(onPressMock).toBeCalled();
// })
