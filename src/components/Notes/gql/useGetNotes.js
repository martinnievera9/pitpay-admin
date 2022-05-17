import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useSearchInput } from 'hooks/useSearchInput';

export const NoteFieldsFragment = gql`
  fragment noteFields on AppNote {
    id
    question
    answer
    platform
    order
  }
`;

export const GET_ADMIN_NOTES = gql`
  query GetAdminNotes {
    getAdminNotes {
      ...noteFields
    }
  }
  ${NoteFieldsFragment}
`;

export const GET_EMPLOYEE_NOTES = gql`
  query GetEmployeeNotes {
    getEmployeeNotes {
      ...noteFields
    }
  }
  ${NoteFieldsFragment}
`;

export const GET_NOTES = gql`
  query GetNotes($input: GetNotesInput!) {
    getNotes(input: $input) {
      count
      results {
        ...noteFields
      }
    }
  }
  ${NoteFieldsFragment}
`;

export function useGetNotes(userType) {
  const { queryString } = useSearchInput();
  const QUERY =
    userType === 'track'
      ? GET_ADMIN_NOTES
      : userType === 'admin'
      ? GET_NOTES
      : GET_EMPLOYEE_NOTES;
  const result = useQuery(QUERY, {
    ...(userType === 'admin'
      ? { variables: { input: { queryString, limit: '200' } } }
      : null)
  });
  return result;
}
