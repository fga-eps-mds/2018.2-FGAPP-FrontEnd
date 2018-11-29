import React from 'react';
import Field from '../../../components/Field';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';

Enzyme.configure({adapter: new Adapter()});

describe('Testing Field', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Field />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  jest.mock('Animated', () => {
  const ActualAnimated = require.requireActual('Animated')
    return {
      ...ActualAnimated,
      timing: (value, config) => ({
        start: callback => {
          value.setValue(config.toValue)
          if (callback) {
            callback()
          }
        },
      }),
    }
  })
})
