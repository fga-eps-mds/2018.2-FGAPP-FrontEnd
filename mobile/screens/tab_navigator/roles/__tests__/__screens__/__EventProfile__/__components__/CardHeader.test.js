import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import CardHeader from '../../../../screens/EventProfile/components/CardHeader';

Enzyme.configure({adapter: new Adapter()});

it('renders correctly', () => {
  const tree = renderer.create(<CardHeader />).toJSON();
  expect(tree).toMatchSnapshot();
});
