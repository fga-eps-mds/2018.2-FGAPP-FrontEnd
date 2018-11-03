import React from 'react';
import OfferDialog from '../tab_navigator/vendas/components/OfferDialog';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';

Enzyme.configure({adapter: new Adapter()});

it('renders correctly', () => {
  const tree = renderer.create(<OfferDialog />).toJSON();
  expect(tree).toMatchSnapshot();
});
