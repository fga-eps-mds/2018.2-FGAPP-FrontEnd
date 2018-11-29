import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import CommentInput from '../../../../screens/EventComments/components/CommentInput';

Enzyme.configure({adapter: new Adapter()});

it('renders correctly', () => {
  const tree = renderer.create(<CommentInput />).toJSON();
  expect(tree).toMatchSnapshot();
});
