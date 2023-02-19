import { type FetchPolicy } from '@apollo/client';
import client from '../../apollo-client';

import {
  GET_LIST_PRODUCTS,
  GET_LIST_PRODUCTS_MENUS,
  GET_LIST_PRODUCT_VARIANTS,
  GET_PRODUCT_BY_ID,
} from './product.graphql';

interface ProductActionInterface {
  variables: Record<string, any>;
  fetchPolicy?: FetchPolicy;
}

const getListProductsMenus = async (props: ProductActionInterface) => {
  const result = await client.query({
    query: GET_LIST_PRODUCTS_MENUS,
    variables: props.variables,
    fetchPolicy: props.fetchPolicy,
  });

  return result;
};
const getListProducts = async (props: ProductActionInterface) => {
  const result = await client.query({
    query: GET_LIST_PRODUCTS,
    variables: props.variables,
    fetchPolicy: props.fetchPolicy,
  });

  return result;
};

const getProductById = async (props: ProductActionInterface) => {
  const result = await client.query({
    query: GET_PRODUCT_BY_ID,
    variables: props.variables,
    fetchPolicy: props.fetchPolicy,
  });

  return result;
};

const getListProductVariants = async (props: ProductActionInterface) => {
  const result = await client.query({
    query: GET_LIST_PRODUCT_VARIANTS,
    variables: props.variables,
    fetchPolicy: props.fetchPolicy,
  });

  return result;
};

export { getListProducts, getListProductsMenus, getListProductVariants, getProductById };
