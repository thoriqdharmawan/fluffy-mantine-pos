import { gql } from '@apollo/client';

export const GET_LIST_TRANSACTIONS = gql`
  query GetListTransactions ($limit: Int) {
    total: transactions_aggregate {
      aggregate {
        count
      }
    }

    transactions (
      limit: $limit 
      order_by: {transaction_date: desc}
    ) {
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
