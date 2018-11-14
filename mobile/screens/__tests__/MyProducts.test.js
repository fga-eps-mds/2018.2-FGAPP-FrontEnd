import React from 'react';
import MyProducts from '../tab_navigator/vendas/screens/my_products/MyProducts';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import fetchMock from 'fetch-mock';

Enzyme.configure({adapter: new Adapter()});

describe('Test loadUserProducts', () => {
    const navigation = {
        state: {
            params: {
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJvZ2VybGVua2VAZ21haWwuY29tIiwidXNlcl9pZCI6MSwib3JpZ19pYXQiOjE1NDE3MTk3NDksImV4cCI6MTU0MTcyMDA0OSwidXNlcm5hbWUiOiJyb2dlcmxlbmtlQGdtYWlsLmNvbSJ9.eCEGRB9yYAkP5iBIybeDsAoWk4HyusPUTX3LBiP0I64"
            }
        },
        navigate: jest.fn(),
    }

    // Url to be mocked
    let my_products_screen_path = '';

    beforeAll(() => {
        process.env.VENDAS_API = 'http://test.ip';
        my_products_screen_path = `${process.env.VENDAS_API}/api/my_products_screen/`;
    })

    beforeEach(() => {
        fetchMock.restore();
    })

    it('Test loadUserProducts with sucess', async (done) => {
        const wrapper = shallow(<MyProducts navigation={navigation}/>);

        const state = {
            title: "Delicious carrot cake",
            price: 1,
        };

        fetchMock.post(my_products_screen_path, [
          {
          "id": 4,
          "fk_vendor": 9,
          "name": "Bolinho de chuva",
          "price": 8,
          "photo": "https://pbs.twimg.com/profile_images/574235336575844353/PZfjQaVw_400x400.jpeg",
          "description": "Bolinho de chuva com canela"
          }
          ,
          {
          "id": 5,
          "fk_vendor": 9,
          "name": "Salgado",
          "price": 3.0,
          "photo": "https://abrilbebe.files.wordpress.com/2017/09/salgadinhos-para-festa-infantil-paulovilela.jpg",
          "description": "Salgados variados"
          }
        ]);

        wrapper.setState(state);
        await wrapper.instance().loadUserProducts()

        process.nextTick(() => {
            done();
        });
    });

    it('Test loadUserProducts with error', async (done) => {
        const wrapper = shallow(<MyProducts navigation={navigation}/>);

        const state = {
            title: "Delicious cake",
            price: 1,
        };

        fetchMock.post(my_products_screen_path, 500);

        wrapper.setState(state);
        await wrapper.instance().loadUserProducts();

        process.nextTick(() => {
            wrapper.update();
            expect(wrapper.instance().state.isDialogVisible).toBeUndefined();

            done();
        });
    });

    it('renders correctly', () => {
      const navigation = {
          state: {
              params: {
                  token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJvZ2VybGVua2VAZ21haWwuY29tIiwidXNlcl9pZCI6MSwib3JpZ19pYXQiOjE1NDE3MTk3NDksImV4cCI6MTU0MTcyMDA0OSwidXNlcm5hbWUiOiJyb2dlcmxlbmtlQGdtYWlsLmNvbSJ9.eCEGRB9yYAkP5iBIybeDsAoWk4HyusPUTX3LBiP0I64"
              }
          },
          navigate: jest.fn(),
      }
      const tree = renderer.create(<MyProducts navigation={navigation}/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('test refreshUserProducts function',() => {
      const navigation = {
          state: {
              params: {
                  token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJvZ2VybGVua2VAZ21haWwuY29tIiwidXNlcl9pZCI6MSwib3JpZ19pYXQiOjE1NDE3MTk3NDksImV4cCI6MTU0MTcyMDA0OSwidXNlcm5hbWUiOiJyb2dlcmxlbmtlQGdtYWlsLmNvbSJ9.eCEGRB9yYAkP5iBIybeDsAoWk4HyusPUTX3LBiP0I64"
              }
          },
          navigate: jest.fn(),
      }
      const wrapper = shallow(<MyProducts navigation = {navigation}/>);
      const refreshUserProducts = wrapper.instance().refreshUserProducts();
    });
})

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
    wrapper = shallow(<MyProducts {...props} />)
    wrapper.setState({ params: params })
  })

  it('test product card navigation', async () => {
    const something = wrapper.find('ProductCard').at(0);
    something.simulate('press');
    await wrapper.instance();
    expect(spyNavigate).toBeCalled();
  })

  it('test fab navigation', async () => {
    console.log(wrapper.debug());
    const something_else = wrapper.find('Styled(Fab)');
    console.log(wrapper.debug());
    something_else.simulate('press');
    await wrapper.instance();
    expect(spyNavigate).toBeCalled();
  })

})
