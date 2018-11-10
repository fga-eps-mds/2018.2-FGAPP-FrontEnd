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

it('test loadOffers',() => {
  const navigation = jest.fn();
  const wrapper = shallow(<Offers navigation = {navigation}/>);
  const loadOffers = wrapper.instance().loadOffers();
});

it('test refreshOffers',() => {
  const navigation = jest.fn();
  const wrapper = shallow(<Offers navigation = {navigation}/>);
  const refreshOffers = wrapper.instance().refreshOffers();
});

it('should test resetNavigation correctly', () => {
  const navigation = jest.fn();
  let Offers = renderer.create(
      <Offers navigation={navigation}
        navigate={action =>
          expect(action).toEqual(navigation.navigate)
        }
      />
    )
    .getInstance();

  Offers.onPress(navigation.navigate);
});
