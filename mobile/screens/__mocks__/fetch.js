import {data} from './api_data.json';

const CREATE_PRODUCT_PATH = `${process.env.VENDAS_API}/api/create_product/`;
const PRODUCTS_PATH = `${process.env.VENDAS_API}/api/all_products/`;
const EDIT_PRODUCT_PATH = `${process.env.VENDAS_API}/api/edit_product/`;

  module.exports = {
    post: jest.fn((url) => {
      console.log(url);
      switch(url) {
        case CREATE_PRODUCT_PATH:
          return Promise.resolve({
            data: data.products
          });
        case PRODUCTS_PATH:
          return Promise.resolve({
            data: data.products
          });
        case EDIT_PRODUCT_PATH:
          return Promise.resolve({
            data: data.products
        });
      }
    });
  };
