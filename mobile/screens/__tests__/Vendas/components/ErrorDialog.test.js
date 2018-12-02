import React from 'react';
import ErrorDialog from '../../../tab_navigator/vendas/screens/my_products/ErrorDialog';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';

Enzyme.configure({adapter: new Adapter()});

it('renders correctly', () => {
  const tree = renderer.create(<ErrorDialog />).toJSON();
  expect(tree).toMatchSnapshot();
});
