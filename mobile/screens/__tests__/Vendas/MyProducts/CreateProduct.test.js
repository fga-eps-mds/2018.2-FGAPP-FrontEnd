import React from 'react';
import CreateProduct from '../../../tab_navigator/vendas/screens/my_products/CreateProduct';
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

describe('Testing navigation', () => {

  let wrapper = null
  const spyNavigate = jest.fn()
  const props = {
    navigation: {
      navigate: spyNavigate,
      state: {}
    }
  }
  const params = {
    token: 'randomToken'
  }

  beforeEach(() => {
    wrapper = shallow(<CreateProduct {...props} />)
    wrapper.setState({ params: params })
  })

  it('should test navigation', async () => {
    await wrapper.instance()._goBack(params)
    expect(spyNavigate).toHaveBeenCalled()
  })
})

describe('Test CreateProduct', () => {
    const navigation = {
        state: {
            params: {
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJvZ2VybGVua2VAZ21haWwuY29tIiwidXNlcl9pZCI6MSwib3JpZ19pYXQiOjE1NDE3MTk3NDksImV4cCI6MTU0MTcyMDA0OSwidXNlcm5hbWUiOiJyb2dlcmxlbmtlQGdtYWlsLmNvbSJ9.eCEGRB9yYAkP5iBIybeDsAoWk4HyusPUTX3LBiP0I64"
            }
        },
        navigate: jest.fn(),
    }

    // Url to be mocked
    let create_product_path = '';

    beforeAll(() => {
        process.env.VENDAS_API = 'http://test.ip';
        create_product_path = `${process.env.VENDAS_API}/api/create_product/`;
    })

    beforeEach(() => {
        fetchMock.restore();
    })

    it('renders correctly', () => {
      const navigation = jest.fn();
      const tree = renderer.create(<CreateProduct navigation={navigation}/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('Test registerProduct with sucess', async (done) => {
        const wrapper = shallow(<CreateProduct navigation={navigation}/>);

        const state = {
            title: "Delicious carrot cake",
            price: 1,
            description: "Not only delicious carrot cake, but with chocolate cover"
        };

        fetchMock.post(create_product_path, []);

        wrapper.setState(state);
        await wrapper.instance().registerProduct()

        process.nextTick(() => {
            done();
        });
    });

    it('Test registerProduct with error response', async (done) => {
        const wrapper = shallow(<CreateProduct navigation={navigation}/>);

        const state = {
            title: "Delicious carrot cake",
            price: 1,
            description: "Not only delicious carrot cake, but with chocolate cover"
        };

        const error = "Campo inválido de preço";

        fetchMock.post(create_product_path, { error });

        wrapper.setState(state);
        await wrapper.instance().registerProduct()

        process.nextTick(() => {
            wrapper.update();
            done();
        });
    })

    it('Test registerProduct with error', async (done) => {
        const wrapper = shallow(<CreateProduct navigation={navigation}/>);

        const state = {
            title: "Delicious cake",
            price: 1,
            description: "There is no chocolate cover, but it still delicious"
        };

        fetchMock.post(create_product_path, 500);

        wrapper.setState(state);
        await wrapper.instance().registerProduct();

        process.nextTick(() => {
            wrapper.update();
            done();
        });
    });

    it('tests openDialog to be true',() => {
      const navigation = jest.fn();
      const wrapper = shallow(<CreateProduct navigation = {navigation}/>);
      const openDialog = wrapper.instance().openDialog();
    });

    it('tests closeDialog to be false',() => {
      const navigation = jest.fn();
      const wrapper = shallow(<CreateProduct navigation = {navigation}/>);
      const closeDialog = wrapper.instance().closeDialog();
    });

    it('tests goBack function',() => {
      const navigation = jest.fn();
      const wrapper = shallow(<CreateProduct navigation = {navigation}/>);
      const _goBack = wrapper.instance()._goBack();
    });

    it('tests componentWillUnmount function',() => {
      const navigation = jest.fn();
      const wrapper = shallow(<CreateProduct navigation = {navigation}/>);
      const componentWillUnmount = wrapper.instance().componentWillUnmount();
    });

    it('test keyboardDidHide function',() => {
      const navigation = jest.fn();
      const wrapper = shallow(<CreateProduct navigation = {navigation}/>);
      const _keyboardDidHide = wrapper.instance()._keyboardDidHide();
    });

    test('change input title ', () => {
      const wrapper = shallow(<CreateProduct />);
      const title = wrapper.find('InputLab').at(0);
      title.simulate('changeText','text');
      expect(wrapper.state('title')).toBe('text');
    });

    test('change input price ', () => {
      const wrapper = shallow(<CreateProduct />);
      const price = wrapper.find('InputLab').at(1);
      price.simulate('changeText','text');
      expect(wrapper.state('price')).toBe('text');
    });

    test('change text area description ', () => {
      const wrapper = shallow(<CreateProduct />);
      const description = wrapper.find('Styled(Textarea)').at(0);
      description.simulate('changeText','text');
      expect(wrapper.state('description')).toBe('text');
    });
})
