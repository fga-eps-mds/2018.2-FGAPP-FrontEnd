import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import Localizacao from '../../../../screens/EventProfile/components/Localizacao';

Enzyme.configure({adapter: new Adapter()});

it('renders correctly', () => {
  const tree = renderer.create(<Localizacao />).toJSON();
  expect(tree).toMatchSnapshot();
});
