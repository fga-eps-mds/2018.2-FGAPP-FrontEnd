import React from 'react';
import OfferDetails from '../tab_navigator/vendas/screens/offers/OfferDetails';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import fetchMock from 'fetch-mock';

Enzyme.configure({adapter: new Adapter()});

describe('Test submitDialog', () => {
    const navigation = {
        state: {
            params: {
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJvZ2VybGVua2VAZ21haWwuY29tIiwidXNlcl9pZCI6MSwib3JpZ19pYXQiOjE1NDE3MTk3NDksImV4cCI6MTU0MTcyMDA0OSwidXNlcm5hbWUiOiJyb2dlcmxlbmtlQGdtYWlsLmNvbSJ9.eCEGRB9yYAkP5iBIybeDsAoWk4HyusPUTX3LBiP0I64",
                product: "someJsonProduct"
            }
        },
        navigate: jest.fn(),
    }

    // Url to be mocked
    let create_order_path = '';

    beforeAll(() => {
        process.env.VENDAS_API = 'http://test.ip';
        create_order_path = `${process.env.VENDAS_API}/api/create_order/`;
    })

    beforeEach(() => {
        fetchMock.restore();
    })

    it('Test submitDialog with sucess', async (done) => {
        const wrapper = shallow(<OfferDetails navigation={navigation}/>);

        const state = {
            buyer_message: "I'm beside you",
            total_price: 1,
            quantity: 1,
            status: "1",
            buyer_message: "Delicious carrot cake"
        };

        fetchMock.post(create_order_path, [
        {
        "id": 38,
        "date": "2018-10-20T14:05:59.014854Z",
        "fk_product": 3,
        "fk_buyer": 8,
        "buyer_message": "",
        "quantity": 10,
        "total_price": 10.0,
        "status": 2,
        "product_name": "Meu"
        },
        {
        "id": 39,
        "date": "2018-10-20T14:09:37.070296Z",
        "fk_product": 3,
        "fk_buyer": 8,
        "buyer_message": "",
        "quantity": 7,
        "total_price": 7.0,
        "status": 2,
        "product_name": "Meu"
        }
        ]);

        wrapper.setState(state);
        await wrapper.instance().submitDialog()

        process.nextTick(() => {
            done();
        });
    });

    it('Test submitDialog with error', async (done) => {
        const wrapper = shallow(<OfferDetails navigation={navigation}/>);

        const state = {
            buyer_message: "I'm beside you",
            total_price: 1,
            quantity: 1,
            status: "1",
            buyer_message: "Delicious carrot cake"
        };

        fetchMock.post(create_order_path, 500);

        wrapper.setState(state);
        await wrapper.instance().submitDialog();

        process.nextTick(() => {
            wrapper.update();
            expect(wrapper.instance().state.isDialogVisible).toBeFalsy();

            done();
        });
    });

    it('renders correctly', () => {
      const navigation = {
          state: {
              params: {
                  token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJvZ2VybGVua2VAZ21haWwuY29tIiwidXNlcl9pZCI6MSwib3JpZ19pYXQiOjE1NDE3MTk3NDksImV4cCI6MTU0MTcyMDA0OSwidXNlcm5hbWUiOiJyb2dlcmxlbmtlQGdtYWlsLmNvbSJ9.eCEGRB9yYAkP5iBIybeDsAoWk4HyusPUTX3LBiP0I64",
                  product: "someJsonProduct"
              }
          },
          navigate: jest.fn(),
      }
      const tree = renderer.create(<OfferDetails navigation={navigation}/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

})

describe('Test calls to dialog box', () => {
  const navigation = {
      state: {
          params: {
              token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJvZ2VybGVua2VAZ21haWwuY29tIiwidXNlcl9pZCI6MSwib3JpZ19pYXQiOjE1NDE3MTk3NDksImV4cCI6MTU0MTcyMDA0OSwidXNlcm5hbWUiOiJyb2dlcmxlbmtlQGdtYWlsLmNvbSJ9.eCEGRB9yYAkP5iBIybeDsAoWk4HyusPUTX3LBiP0I64",
              product: "someJsonProduct"
          }
      },
      navigate: jest.fn(),
  }

  it('test openDialog to be true', () => {
    const wrapper = shallow(<OfferDetails navigation = {navigation}/>);
    const openDialog = wrapper.instance().openDialog();
  });

  it('test closeDialog to be false', () => {
    const wrapper = shallow(<OfferDetails navigation = {navigation}/>);
    const openDialog = wrapper.instance().closeDialog();
  });
})
