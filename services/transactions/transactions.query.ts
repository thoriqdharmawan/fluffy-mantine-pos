import { FetchPolicy } from '@apollo/client';
import { GET_LIST_TRANSACTIONS } from './transactions.graphql';

import client from '../../apollo-client';

interface TransacitonsInterface {
  variables?: Record<string, any>;
  fetchPolicy?: FetchPolicy;
}

const getListTransactions = async (props: TransacitonsInterface) => {
  const result = await client.query({
    query: GET_LIST_TRANSACTIONS,
    variables: props.variables,
    fetchPolicy: props.fetchPolicy,
  });

  return result;
};

export { getListTransactions };
