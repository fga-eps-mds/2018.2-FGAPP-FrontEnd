import React from 'react';
import MyProductDetails from '../../../tab_navigator/vendas/screens/my_products/MyProductDetails';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import fetchMock from 'fetch-mock';

Enzyme.configure({adapter: new Adapter()});

function FormDataMock(){
  this.append = jest.fn();
}
global.FormData = FormDataMock;

describe('Test MyProductDetails requisitions', () => {
  const navigation = {
      state: {
          params: {
              token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJvZ2VybGVua2VAZ21haWwuY29tIiwidXNlcl9pZCI6MSwib3JpZ19pYXQiOjE1NDE3MTk3NDksImV4cCI6MTU0MTcyMDA0OSwidXNlcm5hbWUiOiJyb2dlcmxlbmtlQGdtYWlsLmNvbSJ9.eCEGRB9yYAkP5iBIybeDsAoWk4HyusPUTX3LBiP0I64",
              product: {
                "id": 4,
                "fk_vendor": 9,
                "name": "Bolinho de chuva",
                "price": 8,
                "photo": "https://pbs.twimg.com/profile_images/574235336575844353/PZfjQaVw_400x400.jpeg",
                "description": "Bolinho de chuva com canela"
                }
          }
      },
      navigate: jest.fn(),
  }
  // Url to be mocked
  let edit_product_path = '';

  beforeAll(() => {
      process.env.VENDAS_API = 'http://test.ip';
      edit_product_path = `${process.env.VENDAS_API}/api/edit_product/`;
  })

  beforeEach(() => {
      fetchMock.restore();
  })

  it('renders correctly', () => {
    const tree = renderer.create(<MyProductDetails navigation={navigation}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Test editProduct with sucess', async (done) => {
    const wrapper = shallow(<MyProductDetails navigation={navigation}/>);

    const state = {
      name: 'New Name',
      price: 20,
      description: 'This is the description',
    };

    fetchMock.post(edit_product_path, {
      "photo": "https://pbs.twimg.com/profile_images/574235336575844353/PZfjQaVw_400x400.jpeg",
      "id": 4,
      "price": 20,
      "description": "This is the description",
      "fk_vendor": 1,
      "name": "New name"
    });

    wrapper.setState(state);
    await wrapper.instance().editProduct()

    process.nextTick(() => {
        done();
    });
  });

  it('Test editProduct with  error response', async (done) => {
    const wrapper = shallow(<MyProductDetails navigation={navigation}/>);

    const state = {
      token:undefined,
      isButtonsHidden: false,
      name: '',
      price: '',
      description: '',
      isDialogVisible: false,
      messageError: '',
    };

    const err = {
      "name": [
          "This field is required."
      ]
    };

    fetchMock.post(edit_product_path, {err});

    wrapper.setState(state);
    await wrapper.instance().editProduct()

    process.nextTick(() => {
        wrapper.update();
        done();
    });
  });

  it('Test editProduct with  error 500', async (done) => {
    const wrapper = shallow(<MyProductDetails navigation={navigation}/>);

    const state = {
      token:undefined,
      isButtonsHidden: false,
      name: '',
      price: '',
      description: '',
      isDialogVisible: false,
      messageError: '',
    };

    const error = "Erro interno, não foi possível se comunicar com o servidor.";
    fetchMock.post(edit_product_path, {error});

    wrapper.setState(state);
    await wrapper.instance().editProduct()

    process.nextTick(() => {
        wrapper.update();
        done();
    });

  });

  it('tests openDialog to be true',() => {
    const wrapper = shallow(<MyProductDetails navigation = {navigation}/>);
    const openDialog = wrapper.instance().openDialog();
    expect(wrapper.instance().state.isDialogVisible).toBeTruthy();
  });

  it('tests closeDialog to be false',() => {
    const wrapper = shallow(<MyProductDetails navigation = {navigation}/>);
    const closeDialog = wrapper.instance().closeDialog();
    expect(wrapper.instance().state.isDialogVisible).toBeFalsy();
  });

  it('tests goBack function',() => {
    const wrapper = shallow(<MyProductDetails navigation = {navigation}/>);
    const _goBack = wrapper.instance()._goBack();
  });

  it('tests componentWillUnmount function',() => {
    const wrapper = shallow(<MyProductDetails navigation = {navigation}/>);
    const componentWillUnmount = wrapper.instance().componentWillUnmount();
  });

  it('test keyboardDidHide function',() => {
    const wrapper = shallow(<MyProductDetails navigation = {navigation}/>);
    const event = jest.fn()
    const _keyboardDidHide = wrapper.instance()._keyboardDidHide();
    expect(wrapper.instance().state.isButtonsHidden).toBeFalsy();
  });

  test('change text area name ', () => {
    const wrapper = shallow(<MyProductDetails navigation={navigation}/>);
    const name = wrapper.find('InputLab').at(0);
    name.simulate('changeText','New Name');
    expect(wrapper.state('name')).toBe('New Name');
  });

  test('change text area price ', () => {
    const wrapper = shallow(<MyProductDetails navigation={navigation}/>);
    const price = wrapper.find('InputLab').at(1);
    price.simulate('changeText','20');
    expect(wrapper.state('price')).toBe('20');
  });

  test('change text area description ', () => {
    const wrapper = shallow(<MyProductDetails navigation={navigation}/>);
    const description = wrapper.find('Styled(Textarea)').at(0);
    description.simulate('changeText','text');
    expect(wrapper.state('description')).toBe('text');
  });
})
