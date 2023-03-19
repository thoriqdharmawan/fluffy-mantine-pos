import { gql } from '@apollo/client';

export const GET_ACTIVE_ATTENDACE = gql`
  query GetActiveAttendances($companyId: uuid!) {
    total: attendances_aggregate(
      where: { companyId: { _eq: $companyId }, updated_at: { _is_null: true } }
    ) {
      aggregate {
        count
      }
    }
    attendances(where: { companyId: { _eq: $companyId }, updated_at: { _is_null: true } }) {
      id
      employee {
        id
        name
      }
    }
  }
`;

export const START_WORK = gql`
  mutation InsertAttendances(
    $employeeId: uuid!
    $companyId: uuid!
    $money_in_drawer_start: numeric!
    $note: String
  ) {
    insert_attendances(
      objects: {
        employeeId: $employeeId
        companyId: $companyId
        money_in_drawer_start: $money_in_drawer_start
        note: $note
      }
    ) {
      affected_rows
    }
  }
`;

export const DONE_WORK = gql`
  mutation DoneWork($id: uuid!, $money_in_drawer_end: numeric!) {
    update_attendances(
      where: { id: { _eq: $id } }
      _set: { money_in_drawer_end: $money_in_drawer_end, updated_at: "now()" }
    ) {
      affected_rows
    }
  }
`;
