import React from 'react';
import CreateProduct from '../tab_navigator/vendas/screens/my_products/CreateProduct';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';

Enzyme.configure({adapter: new Adapter()});

it('renders correctly', () => {
  const navigation = jest.fn();
  const tree = renderer.create(<CreateProduct navigation={navigation}/>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('test openDialog to be true',() => {
  const navigation = jest.fn();
  const wrapper = shallow(<CreateProduct navigation = {navigation}/>);
  const openDialog = wrapper.instance().openDialog();
  //console.log(openDialog);
});

it('test closeDialog to be false',() => {
  const navigation = jest.fn();
  const wrapper = shallow(<CreateProduct navigation = {navigation}/>);
  const closeDialog = wrapper.instance().closeDialog();
  //console.log(closeDialog);
});

it('test goBack',() => {
  const navigation = jest.fn();
  const wrapper = shallow(<CreateProduct navigation = {navigation}/>);
  const _goBack = wrapper.instance()._goBack();
  //console.log(_goBack);
});

it('test registerProduct function',() => {
  const navigation = jest.fn();
  const wrapper = shallow(<CreateProduct navigation = {navigation}/>);
  const registerProduct = wrapper.instance().registerProduct();
  //console.log(registerProduct);
});

it('test componentWillUnmount function',() => {
  const navigation = jest.fn();
  const wrapper = shallow(<CreateProduct navigation = {navigation}/>);
  const componentWillUnmount = wrapper.instance().componentWillUnmount();
  //console.log(componentWillUnmount);
});

// it('test keyboardDidShow function',() => {
//   const navigation = jest.fn();
//   const wrapper = shallow(<CreateProduct navigation = {navigation}/>);
//   const _keyboardDidShow = wrapper.instance()._keyboardDidShow();
//   //console.log(_keyboardDidShow);
// });

it('test keyboardDidHide function',() => {
  const navigation = jest.fn();
  const wrapper = shallow(<CreateProduct navigation = {navigation}/>);
  const _keyboardDidHide = wrapper.instance()._keyboardDidHide();
  //console.log(_keyboardDidHide);
});

test('change input title ', () => {
  const wrapper = shallow(<CreateProduct />);
  const title = wrapper.find('InputLab').at(0);
  title.simulate('changeText','text');
  expect(wrapper.state('title')).toBe('text');
});

test('change input price ', () => {
  const wrapper = shallow(<CreateProduct />);
  const price = wrapper.find('InputLab').at(1);
  price.simulate('changeText','text');
  expect(wrapper.state('price')).toBe('text');
});

test('change text area description ', () => {
  const wrapper = shallow(<CreateProduct />);
  //console.log(wrapper.debug());
  const description = wrapper.find('Styled(Textarea)').at(0);
  description.simulate('changeText','text');
  expect(wrapper.state('description')).toBe('text');
});
