import React from 'react';
import Offers from '../tab_navigator/vendas/screens/offers/Offers';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';

Enzyme.configure({adapter: new Adapter()});

it('renders correctly', () => {
  const navigation = jest.fn();
  const tree = renderer.create(<Offers navigation={navigation}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
