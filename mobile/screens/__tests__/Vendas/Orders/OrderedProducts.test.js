import React from 'react';
import OrderedProducts from '../../../tab_navigator/vendas/screens/orders/OrderedProducts';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import fetchMock from 'fetch-mock';

Enzyme.configure({adapter: new Adapter()});

const TOKEN_EXAMPLE = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJvZ2VybGVua2VAZ21haWwuY29tIiwidXNlcl9pZCI6MSwib3JpZ19pYXQiOjE1NDE3MTk3NDksImV4cCI6MTU0MTcyMDA0OSwidXNlcm5hbWUiOiJyb2dlcmxlbmtlQGdtYWlsLmNvbSJ9.eCEGRB9yYAkP5iBIybeDsAoWk4HyusPUTX3LBiP0I64";

describe('Test loadOrders requisition and snapshot', () => {
    const navigation = {
        state: {
            params: {
                token: TOKEN_EXAMPLE
            }
        },
        navigate: jest.fn(),
    }

    // Url to be mocked
    let orders_screen_path = '';
    let buyer_orders_path = '';


    beforeAll(() => {
        process.env.VENDAS_API = 'http://test.ip';
        orders_screen_path = `${process.env.VENDAS_API}/api/orders_screen/`;
        buyer_orders_path = `${process.env.VENDAS_API}/api/buyer_orders/`;

    })

    beforeEach(() => {
        fetchMock.restore();
    })

    it('tests refreshOrders function',() => {
      const wrapper = shallow(<OrderedProducts navigation = {navigation}/>);
      const refreshOrders = wrapper.instance().refreshOrders();
    })

    it('Test loadOrders with sucess', async (done) => {
        const wrapper = shallow(<OrderedProducts navigation={navigation}/>);

        fetchMock.post(orders_screen_path, {
            "buyer_message": "2",
            "date": "2018-11-14T04:47:47.076320Z",
            "fk_buyer": 3,
            "fk_product": 2,
            "id": 12,
            "product_name": "Product 1",
            "quantity": 3,
            "status": 0,
            "total_price": 0.045,
          },
          {
            "buyer_message": "Hi",
            "date": "2018-11-14T13:57:47.964824Z",
            "fk_buyer": 6,
            "fk_product": 2,
            "id": 13,
            "product_name": "Product 2",
            "quantity": 1,
            "status": 0,
            "total_price": 0.5,
          });

        fetchMock.post(buyer_orders_path, {
            "buyer_message": "2",
            "date": "2018-11-14T04:47:47.076320Z",
            "fk_buyer": 3,
            "fk_product": 2,
            "id": 12,
            "product_name": "Product 1",
            "quantity": 3,
            "status": 0,
            "total_price": 0.045,
          });

        const state = {
            token: TOKEN_EXAMPLE,
            orders: [''],
            buyer_orders: [''],
            refreshing: false,
            my_order_message: 'Meus pedidos',
            received_order_message: 'Pedidos recebidos',
        };

        wrapper.setState(state);
        await wrapper.instance().loadOrders()

        process.nextTick(() => {
            done();
        });
    });

})

describe('Testing navigation', () => {

    let wrapper = null
    const spyNavigate = jest.fn()
    const props = {
      navigation: {
        navigate: spyNavigate,
        state: {
            token:TOKEN_EXAMPLE,
        }
      }
    }
    const params = {
      token: 'randomToken'
    }

    beforeEach(() => {
      wrapper = shallow(<OrderedProducts {...props} />)
      wrapper.setState({ params: params })
    })

    it('test buyer order card navigation', async () => {
      const something = wrapper.find('BuyerOrderCard').at(0);
      something.simulate('press');
      await wrapper.instance();
      expect(spyNavigate).toBeCalled();
    })

    it('test order card navigation', async () => {
      const something_else = wrapper.find('OrderCard');
      //console.log(wrapper.debug());
      something_else.simulate('press');
      await wrapper.instance();
      expect(spyNavigate).toBeCalled();
    })
})
