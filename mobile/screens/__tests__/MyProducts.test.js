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
