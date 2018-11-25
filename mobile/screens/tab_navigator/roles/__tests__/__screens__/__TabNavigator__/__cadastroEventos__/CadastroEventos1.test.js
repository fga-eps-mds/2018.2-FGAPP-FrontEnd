import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import CadastroEventos1 from '../../../../screens/TabNavigator/cadastroEventos/CadastroEventos1';

Enzyme.configure({adapter: new Adapter()});

it('renders correctly', () => {
  const tree = renderer.create(< CadastroEventos1/>).toJSON();
  expect(tree).toMatchSnapshot();
});