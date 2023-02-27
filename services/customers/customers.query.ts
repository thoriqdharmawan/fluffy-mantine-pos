import { FetchPolicy } from '@apollo/client';

import { GET_LIST_CUSTOMERS } from './customerss.graphql';

import client from '../../apollo-client';

interface ActionInterface {
  variables?: Record<string, any>;
  fetchPolicy?: FetchPolicy;
}

const getListCustomers = async (props: ActionInterface) => {
  const result = await client.query({
    query: GET_LIST_CUSTOMERS,
    variables: props.variables,
    fetchPolicy: props.fetchPolicy,
  });

  return result;
};

export { getListCustomers };
