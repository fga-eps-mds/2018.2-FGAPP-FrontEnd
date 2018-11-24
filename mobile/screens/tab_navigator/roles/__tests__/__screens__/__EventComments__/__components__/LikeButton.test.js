import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import LikeButton from '../../../../screens/TabNavigator/feed/components/LikeButton';

Enzyme.configure({adapter: new Adapter()});

it('renders correctly', () => {
  const tree = renderer.create(<LikeButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
