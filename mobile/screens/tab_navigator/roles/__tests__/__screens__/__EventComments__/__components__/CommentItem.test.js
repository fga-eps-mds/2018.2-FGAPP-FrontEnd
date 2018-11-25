import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import CommentItem from '../../../../screens/EventComments/components/CommentItem'

Enzyme.configure({adapter: new Adapter()});

it('renders correctly', () => {
  const tree = renderer.create(<CommentItem/>).toJSON();
  expect(tree).toMatchSnapshot();
});