import React from 'react';
import ProductCard from '../tab_navigator/vendas/components/ProductCard';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';

Enzyme.configure({adapter: new Adapter()});

it('renders correctly', () => {
  const tree = renderer.create(<ProductCard />).toJSON();
  expect(tree).toMatchSnapshot();
});
