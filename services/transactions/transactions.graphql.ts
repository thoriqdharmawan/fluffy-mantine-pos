import { gql } from '@apollo/client';

export const GET_LIST_TRANSACTIONS = gql`
  query GetListTransactions($limit: Int, $offset: Int) {
    total: transactions_aggregate {
      aggregate {
        count
      }
    }

    transactions(limit: $limit, offset: $offset, order_by: { transaction_date: desc }) {
      id
      code
      transaction_date
      total_amount
      status
      employee {
        id
        name
      }
      customer {
        id
        name
      }
    }
  }
`;

export const GET_DETAIL_TRANSACTION = gql`
  query GetListTransactions($id: uuid!) {
    transactions(where: { id: { _eq: $id } }) {
      id
      code
      transaction_date
      total_amount
      payment_amount
      payment_method
      payment_type
      status
      tax
      tax_type
      products_solds {
        id
        name
        quantity_sold
        total_price
        unit_price
        variants
      }
      employee {
        id
        name
      }
      customer {
        id
        name
      }
    }
  }
`;

export const GET_TOTAL_TRANSACTIONS_TODAY = gql`
  query GetTotalTransactionToday($gte: timestamptz, $lte: timestamptz) {
    total: transactions_aggregate(where: { transaction_date: { _gte: $gte, _lte: $lte } }) {
      aggregate {
        count
      }
    }
  }
`;

export const ADD_TRANSACTION = gql`
  mutation AddTransactions(
    $customerId: Int
    $payment_amount: numeric
    $tax: numeric
    $total_amount: numeric
    $code: String
    $transaction_date: timestamptz
    $payment_method: String
    $payment_type: String
    $status: String
    $tax_type: String
    $employeeId: uuid
    $products_solds: [products_sold_insert_input!]!
  ) {
    insert_transactions(
      objects: {
        customerId: $customerId
        payment_amount: $payment_amount
        tax: $tax
        total_amount: $total_amount
        code: $code
        transaction_date: $transaction_date
        payment_method: $payment_method
        payment_type: $payment_type
        status: $status
        tax_type: $tax_type
        employeeId: $employeeId
        products_solds: { data: $products_solds }
      }
    ) {
      affected_rows
    }
  }
`;
