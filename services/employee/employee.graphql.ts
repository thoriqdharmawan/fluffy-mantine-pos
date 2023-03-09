import { gql } from '@apollo/client';

export const GET_LIST_EMPLOYEES = gql`
  query GetEmployees($where: employees_bool_exp!) {
    total: employees_aggregate(
      where: $where
    ) {
      aggregate {
        count
      }
    }
    employees(
      where: $where
      limit: 10
      order_by: { created_at: desc }
    ) {
      id
      name
    }
  }
`;

export const UPDATE_EMPLOYEE_STATUS = gql`
  mutation UpdateEmployeeStatus($employeeId: uuid!, $status: String!) {
    update_employees(where: { id: { _eq: $employeeId } }, _set: { status: $status }) {
      affected_rows
    }
  }
`;
