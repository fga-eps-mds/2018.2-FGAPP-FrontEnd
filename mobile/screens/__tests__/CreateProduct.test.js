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

it('tests openDialog to be true',() => {
  const navigation = jest.fn();
  const wrapper = shallow(<CreateProduct navigation = {navigation}/>);
  const openDialog = wrapper.instance().openDialog();
  //console.log(openDialog);
});

it('tests closeDialog to be false',() => {
  const navigation = jest.fn();
  const wrapper = shallow(<CreateProduct navigation = {navigation}/>);
  const closeDialog = wrapper.instance().closeDialog();
});

it('tests goBack function',() => {
  const navigation = jest.fn();
  const wrapper = shallow(<CreateProduct navigation = {navigation}/>);
  const _goBack = wrapper.instance()._goBack();
});

it('tests registerProduct function',() => {
  const navigation = jest.fn();
  const wrapper = shallow(<CreateProduct navigation = {navigation}/>);
  const registerProduct = wrapper.instance().registerProduct();
});

it('tests componentWillUnmount function',() => {
  const navigation = jest.fn();
  const wrapper = shallow(<CreateProduct navigation = {navigation}/>);
  const componentWillUnmount = wrapper.instance().componentWillUnmount();
});

it('tests keyboardDidShow function',() => {
  const navigation = jest.fn();
  const isButtonsHidden = true;
  const wrapper = shallow(<CreateProduct navigation = {navigation}/>);
  const _keyboardDidShow = wrapper.instance()._keyboardDidShow();
});

it('test keyboardDidHide function',() => {
  const navigation = jest.fn();
  const wrapper = shallow(<CreateProduct navigation = {navigation}/>);
  const _keyboardDidHide = wrapper.instance()._keyboardDidHide();
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
