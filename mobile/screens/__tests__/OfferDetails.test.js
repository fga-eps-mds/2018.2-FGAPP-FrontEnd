import React from 'react';
import OfferDetails from '../tab_navigator/vendas/screens/offers/OfferDetails';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';

Enzyme.configure({adapter: new Adapter()});

it('renders correctly', () => {
  const navigation = jest.fn();
  const tree = renderer.create(<OfferDetails navigation={navigation}/>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('test openDialog to be true', () => {
  const navigation = jest.fn();
  const wrapper = shallow(<Offers navigation = {navigation}/>);
  const openDialog = wrapper.instance().openDialog();
});

it('test closeDialog to be false', () => {
  const navigation = jest.fn();
  const wrapper = shallow(<Offers navigation = {navigation}/>);
  const openDialog = wrapper.instance().closeDialog();
});
