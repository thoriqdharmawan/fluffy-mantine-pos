import { gql } from '@apollo/client';

const GET_LIST_CUSTOMERS = gql`
  query GetCustomers {
    total: customers_aggregate {
      aggregate {
        count
      }
    }

    customers {
      id
      name
      note
      phone
      address
    }
  }
`;

export { GET_LIST_CUSTOMERS };
