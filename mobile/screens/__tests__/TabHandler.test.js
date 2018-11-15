import React from 'react';
import TabHandler from '../TabHandler';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';

Enzyme.configure({adapter: new Adapter()});

it('renders correctly', () => {
  const tree = renderer.create(<TabHandler />).toJSON();
  expect(tree).toMatchSnapshot();
});