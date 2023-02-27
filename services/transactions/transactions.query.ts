import { FetchPolicy } from '@apollo/client';
import { GET_LIST_TRANSACTIONS, GET_TOTAL_TRANSACTIONS_TODAY } from './transactions.graphql';

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

const getTotalTransactionsToday = async (props: TransacitonsInterface) => {
  const result = await client.query({
    query: GET_TOTAL_TRANSACTIONS_TODAY,
    variables: props.variables,
    fetchPolicy: props.fetchPolicy,
  });

  return result;
};

export { getListTransactions, getTotalTransactionsToday };
