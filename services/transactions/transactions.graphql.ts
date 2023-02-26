import { gql } from '@apollo/client';

export const GET_LIST_TRANSACTIONS = gql`
  query GetListTransactions {
    total: transactions_aggregate {
      aggregate {
        count
      }
    }

    transactions {
      id
      code
      transaction_date
      total_amount
      status
      employee {
        id
        name
      }
      cusotmer {
        id
        name
      }
    }
  }
`;
