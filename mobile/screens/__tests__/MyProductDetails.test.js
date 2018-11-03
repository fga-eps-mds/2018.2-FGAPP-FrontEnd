import React from 'react';
import MyProductDetails from '../tab_navigator/vendas/screens/my_products/MyProductDetails';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';

Enzyme.configure({adapter: new Adapter()});

it('renders correctly', () => {
  const navigation = jest.fn();
  const tree = renderer.create(<MyProductDetails navigation={navigation}/>).toJSON();
  expect(tree).toMatchSnapshot();
});

/* test('change input title ', () => {
  const wrapper = shallow(<MyProductDetails />);
  const title = wrapper.find('InputLab').at(0);
  title.simulate('changeText','text');
  expect(wrapper.state('title')).toBe('text');
});

test('change input price ', () => {
  const wrapper = shallow(<MyProductDetails />);
  const price = wrapper.find('InputLab').at(1);
  price.simulate('changeText','text');
  expect(wrapper.state('price')).toBe('text');
});

test('change text area description ', () => {
  const wrapper = shallow(<MyProductDetails />);
  //console.log(wrapper.debug());
  const description = wrapper.find('Styled(Textarea)').at(0);
  description.simulate('changeText','text');
  expect(wrapper.state('description')).toBe('text');
});
*/
