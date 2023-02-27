import client from '../../apollo-client';

import { ADD_TRANSACTION } from './transactions.graphql';

const addTransaction = ({ variables }: { variables: any }) => {
  return client.mutate({
    mutation: ADD_TRANSACTION,
    variables,
  });
};

export { addTransaction };
