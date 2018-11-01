import React from 'react';
import CreateProduct from '../tab_navigator/vendas/screens/my_products/CreateProduct';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';

Enzyme.configure({adapter: new Adapter()});

it('renders correctly', () => {
  const tree = renderer.create(<CreateProduct />).toJSON();
  expect(tree).toMatchSnapshot();
});

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

it('Should call registerProduct function', async() => {
  const spy = jest.spyOn(CreateProduct.prototype, 'registerProduct');
  const wrapper = shallow(<CreateProduct />);
  wrapper.setState({fk_vendor: 1}, {name: 'Brigadeiro'}, {price: 1.5}, {photo: 'https://panelinha-sitenovo.s3-sa-east-1.amazonaws.com/receita/958014000000-Brigadeiro.jpg'}, {description: 'nham nham'});
  await flushPromises();
  wrapper.update();
  const
})
