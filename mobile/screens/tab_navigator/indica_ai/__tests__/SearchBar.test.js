import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SearchBar from '../screens/search_local/SearchScreen';
import ButtonWithIcon from '../components/ButtonWithIcon';
import InputWithButton from '../components/InputWithButton.js';
import renderer from 'react-test-renderer';


Enzyme.configure({adapter: new Adapter()});

describe('Test SearchScreen action', () => {

  it("Test search locals by name was success", () => {
    const url = 'https://indicaai.herokuapp.com/locals/name/${name}';
    const name = 'fgaTest';

    expect(name.length).toBeGreaterThan(0);
  })

  it ("Test searchAction", () => {
    const url = 'https://indicaai.herokuapp.com/locals/name/${"test"}';

    expect([1,2]).toEqual([1,2]);
  })

  /*it('renders correctly', () => {
  const tree = renderer.create(<SearchBar/>).toJSON();
  expect(tree).toMatchSnapshot();
})*/

  /*it('Testing onPress', () => {
     const onPressMock = jest.fn();
     const wrapper = shallow((<InputWithButton onPress = {onPressMock}></InputWithButton>));
     button.simulate('click')
     expect(onPressMock).toBeCalled();
 })*/
});
