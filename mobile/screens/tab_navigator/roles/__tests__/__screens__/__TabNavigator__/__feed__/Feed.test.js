import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import Feed from '../../../../screens/TabNavigator/feed/Feed'

Enzyme.configure({adapter: new Adapter()});

it('renders correctly', () => {
  const tree = renderer.create(< Feed/>).toJSON();
  expect(tree).toMatchSnapshot();
});