import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';

import ImageModal from '../components/ImageModal';

Enzyme.configure({adapter: new Adapter()});

  it('renders correctly', () => {
    const tree = renderer.create(<ImageModal />).toJSON();
    expect(tree).toMatchSnapshot();
});
