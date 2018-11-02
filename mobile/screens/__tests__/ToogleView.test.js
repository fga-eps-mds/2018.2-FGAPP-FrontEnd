import React from 'react';
import ToogleView from '../tab_navigator/vendas/screens/my_products/ToogleView';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';

Enzyme.configure({adapter: new Adapter()});

it('renders correctly', () => {
  const navigation = jest.fn();
  const tree = renderer.create(<ToogleView navigation={navigation}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
