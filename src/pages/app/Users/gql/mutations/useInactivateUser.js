import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useCallback } from 'react';

export const INACTIVATE_USER = gql`
  mutation InactivateUser($id: Int!) {
    inactivateUser(id: $id) {
      id
      first_name
      middle_name
      address
      last_name
      email
      role
      cellphone
      suffix
      inactive
      associations
    }
  }
`;

export function useInactivateUser() {
  const [inactivateUserMutation, result] = useMutation(INACTIVATE_USER);

  const inactivateUser = useCallback(
    (id, options = {}) => {
      inactivateUserMutation({ variables: { id }, ...options });
    },
    [inactivateUserMutation]
  );
  return [inactivateUser, result];
}
