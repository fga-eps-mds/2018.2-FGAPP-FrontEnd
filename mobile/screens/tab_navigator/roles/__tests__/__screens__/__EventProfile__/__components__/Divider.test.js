import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import Divider from '../../../../screens/EventProfile/components/Divider';

Enzyme.configure({adapter: new Adapter()});

it('renders correctly', () => {
  const tree = renderer.create(<Divider />).toJSON();
  expect(tree).toMatchSnapshot();
});
