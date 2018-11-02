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

// test('on change title input', () => {
//   const navigation = jest.fn();
//   const value = {
//     token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1MywidXNlcm5hbWUiOiJ0ZXN0ZTE2QGdtYWlsLmNvbSIsImV4cCI6MTU0MDYwMjA5MSwiZW1haWwiOiJ0ZXN0ZTE2QGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNTQwNjAxNzkxfQ.SNTK7ViXyoLH54YBAIgF_uvIBqDetEkMFTNTzkXeUY8",
//     fk_vendor: 1,
//     name: 'Product 1',
//     price: 11.0,
//     photo: 'http://rene.r.e.pic.centerblog.net/o/67fef2a5.jpg',
//     description: 'Random description'
//   }
//   const wrapper = shallow(<CreateProduct />);
//   wrapper.setState({value: value});
//   console.log(wrapper.debug());
//   const title = wrapper.find('Input').at(0);
//   title.simulate('changeText','text');
//   expect(wrapper.state('title')).toBe('text');
// });

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
  //console.log(registerProduct);
});
