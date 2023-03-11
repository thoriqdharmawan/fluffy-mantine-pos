import { gql } from '@apollo/client';

export const GET_LIST_TRANSACTIONS = gql`
  query GetListTransactions($where: transactions_bool_exp!, $limit: Int, $offset: Int) {
    total: transactions_aggregate (where: $where) {
      aggregate {
        count
      }
    }

    transactions(where: $where, limit: $limit, offset: $offset, order_by: { created_at: desc }) {
      id
      code
      total_amount
      status
      created_at
    }
  }
`;

export const GET_DETAIL_TRANSACTION = gql`
  query GetListTransactions($id: uuid!) {
    transactions(where: { id: { _eq: $id } }) {
      id
      code
      created_at
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
    total: transactions_aggregate(where: { created_at: { _gte: $gte, _lte: $lte } }) {
      aggregate {
        count
      }
    }
  }
`;

export const ADD_TRANSACTION = gql`
  mutation AddTransactions(
    $customerId: Int
    $companyId: uuid!
    $payment_amount: numeric
    $tax: numeric
    $total_amount: numeric
    $code: String
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
        companyId: $companyId
        payment_amount: $payment_amount
        tax: $tax
        total_amount: $total_amount
        code: $code
        payment_method: $payment_method
        payment_type: $payment_type
        status: $status
        tax_type: $tax_type
        employeeId: $employeeId
        products_solds: { data: $products_solds }
      }
    ) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

export const DECREASE_VARIANT_BY_ID = gql`
  mutation DecreaseVarinats($quantity: Int!, $id: Int!) {
    update_product_variants(_inc: { stock: $quantity }, where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
