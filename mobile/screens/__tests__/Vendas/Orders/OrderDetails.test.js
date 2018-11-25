import React from 'react';
import OrderDetails from '../../../tab_navigator/vendas/screens/orders/OrderDetails';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import fetchMock from 'fetch-mock';

Enzyme.configure({adapter: new Adapter()});

describe('Testing navigation', () => {

    let wrapper = null
    const spyNavigate = jest.fn()
    const props = {
        navigation: {
            token: 'randomToken',
            navigate: spyNavigate,
            state: {
                params:{
                    order: {
                        "buyer_message": "This is a buyer message",
                        "fk_buyer": 3,
                        "fk_product": 2,
                        "id": 5,
                        "product_name": "This is a product name",
                        "quantity": 1,
                        "status": 1,
                        "total_price": 127.99,
                    },
                },
            },
        },
    }
    const params = {
        token: 'randomToken',
    }

    beforeEach(() => {
        wrapper = shallow(<OrderDetails {...props} />)
        wrapper.setState({ params: params })
    })

    it('should test navigation', async () => {
        await wrapper.instance()._goBack(params)
        expect(spyNavigate).toHaveBeenCalled()
    })
})

describe('Test _cancelButton', () => {
    const navigation = {
        state: {
            params: {
                token: "ThisIsAToken",
                order: {
                    "buyer_message": "This is a buyer message",
                    "fk_buyer": 3,
                    "fk_product": 2,
                    "id": 5,
                    "product_name": "This is a product name",
                    "quantity": 1,
                    "status": 1,
                    "total_price": 127.99,
                },
            },
        },
        navigate: jest.fn(),
    }

    const ORDER_CLOSED = 1;
    // Url to be mocked
    let set_order_status_path = '';
    let get_product_path = '';
    let get_user_path = '';

    beforeAll(() => {
        process.env.VENDAS_API = 'http://test.ip';
        set_order_status_path = `${process.env.VENDAS_API}/api/set_order_status/`;
        get_product_path = `${process.env.VENDAS_API}/api/get_product/`;
        get_user_path = `${process.env.VENDAS_API}/api/get_name/`;
    })

    beforeEach(() => {
        fetchMock.restore();
    })

    it('renders correctly', () => {
        const tree = renderer.create(<OrderDetails navigation={navigation}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Test buttons functions with sucess', async (done) => {
        const wrapper = shallow(<OrderDetails navigation={navigation}/>);

        fetchMock.post(set_order_status_path, {
            "buyer_message": "Message",
            "date": "2018-11-14T01:16:07.680903Z",
            "fk_buyer": 3,
            "fk_product": 2,
            "id": 5,
            "product_name": "Product 3",
            "quantity": 1,
            "status": 1,
            "total_price": 127.99,
        });

        fetchMock.post(get_product_path, {
            "description": "This is a description",
            "fk_vendor": 3,
            "id": 2,
            "name": "Name",
            "photo": "This is a photo url",
            "price": 127.99,
        });

        fetchMock.post(get_user_path, {
            "name": "UserName",
        });

        const state = {
            params: {
                token: "ThisIsAToken",
                order: {
                    "buyer_message": "This is a buyer message",
                    "fk_buyer": 3,
                    "fk_product": 2,
                    "id": 5,
                    "product_name": "This is a product name",
                    "quantity": 1,
                    "status": 1,
                    "total_price": 127.99,
                },
                request: '0',
            },
        };

        wrapper.setState(state);
        await wrapper.instance()._closeButton()
        await wrapper.instance()._cancelButton()
        await wrapper.instance()._buttonRequest()
        process.nextTick(() => {
            done();
        });

    });
})
